import { Context } from "koa";
import { OpenAIApi, Configuration, CreateChatCompletionRequest, createChatCompletionResponse } from "openai";
import dotenv from 'dotenv';
import { Assignment } from "../Models/Assignment";
import { aiProp, getAuth0Email } from "../Middleware/Helpers";
import { AIPromptTextWithErros, AIPromptListOfErrors, AIPromtExpandKnowledge } from "../Prompts/Promts";
dotenv.config()



export default {
    aiPost: async (ctx: Context) => {
        try {
            //creates config and calls ai to make feedback
            const body = ctx.request.body as { content: string, studentId: number, titleId: number }

            const content = body.content
            const studentId = body.studentId
            const titleId = body.titleId
            const configuration = new Configuration({
                apiKey: "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"
            });
            const openai = new OpenAIApi(configuration)
            
            //FIRST AI CALL
            const aiResponse1 = await openai.createChatCompletion(aiProp(`${AIPromptTextWithErros} + """${content}"""`) as CreateChatCompletionRequest);
            const feedback1 = JSON.stringify(aiResponse1.data.choices[0].message?.content)
            // SECOND AI CALL

            const aiResponse2 = await openai.createChatCompletion(aiProp(`${AIPromptListOfErrors} + """${feedback1}"""`) as CreateChatCompletionRequest);
            const feedback2 = JSON.stringify(aiResponse2.data.choices[0].message?.content)

            // //THIRD AI CALL
            const aiResponse3 = await openai.createChatCompletion(aiProp(`${AIPromtExpandKnowledge} + """${content}"""`) as CreateChatCompletionRequest)
            const feedback3 = JSON.stringify(aiResponse3.data.choices[0].message?.content)

            // COMBINES AI CALLS WITH WITH REMOVABLE ELEMENT INBETWEEN
            // const feedback = feedback1 + "-+-" + feedback2 + "-+-" + feedback3

            // calls auth0 for usertoken and extracts email
            const userEmail = await getAuth0Email(ctx);
            const updateCheck = await Assignment.findOne({where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }})
            if (!updateCheck) {
                const response = await Assignment.create({ ownerId: JSON.stringify(userEmail), text: JSON.stringify(content), responseMistakes: feedback1, responseList: feedback2, responseExpand: feedback3, titleId: titleId, studentId: studentId })
                ctx.body = { responseMistakes: response.dataValues.responseMistakes, 
                    responseList: response.dataValues.responseList, 
                    responseExpand: response.dataValues.responseExpand }
          } else {
                const response = await Assignment.update({text: JSON.stringify(content), responseMistakes: feedback1, responseList: feedback2, responseExpand: feedback3,}, {where: { ownerId: JSON.stringify(userEmail), titleId: titleId, studentId: studentId }, returning:true})

                ctx.body = { responseMistakes: response[1][0].dataValues.responseMistakes,
                    responseList: response[1][0].dataValues.responseList,
                    responseExpand: response[1][0].dataValues.responseExpand
                }
            }
            // console.log(feedback)
            // ctx.body = feedback

            } catch (error) {
                console.log(error)
                 ctx.body = { responseMistakes: 'oops something went wrong',
                    responseList: '',
                    responseExpand: ''
                }
            }

    },
    getAssignment: async (ctx: Context) => {
        try {
            const body = ctx.params as {studentId: string, titleId:string}
            const userEmail = await getAuth0Email(ctx) as string
            const studentId = parseInt(body.studentId)
            const titleId = parseInt(body.titleId)
            const response = await Assignment.findOne({where: {studentId: studentId, ownerId:JSON.stringify(userEmail), titleId:titleId}})
            ctx.status = 200
            ctx.body = response ? { responseMistakes: response.dataValues.responseMistakes, 
                responseList: response.dataValues.responseList, 
                responseExpand: response.dataValues.responseExpand } : {text: null}
        } catch (error) {
            ctx.status = 500
            console.log(error)
        }

    }
}