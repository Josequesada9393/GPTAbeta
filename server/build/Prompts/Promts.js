"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIPromtExpandKnowledge = exports.AIPromptListOfErrors = exports.AIPromptTextWithErros = void 0;
exports.AIPromptTextWithErros = `You will be provided with a text delimited by triple quotes. 
It will contain a text in English that may or may not have spelling, grammar, or vocabulary mistakes. 
Once you have the text, you need to return the same text and not make any corrections. 
You only need to delimit each word or sentence that potentially has a spelling, grammar, or vocabulary mistake in asterisks.
Delimit words or sentences only if you are confident that there is an error.
Here you have a sample input delimited by double quotes
""Ther is a cat in the hous. It is sitting on the table and looking at the fishes tank. The cat are very cute and playful.
There is also a dog in the gardn. It likes to chase the balls and play with childran. The dog is very friendli.""
Here you have a sample output delimited by double quotes
""*Ther* is a cat in the *hous*. It is sitting on the table and looking at the *fishes* tank. The *cat* *are* very cute and playful.
There is also a dog in the *gardn*. It likes to chase the balls and play with *childran*. The dog is very *friendli*.""

If the text you are provided with is not in English, return "Please provide a text in English"
If the text does not have any grammar, vocabulary or spelling mistake, return "the text does not have any mistake, congrats!"

Here is the text delimited by triple quotes as mentioned above
`;
exports.AIPromptListOfErrors = `You will be provided with a text delimited by triple quotes.
It will contain a text in English that may or may not have spelling, grammar, or vocabulary mistakes. 
The words with mistakes will be delimited by asterisks. Write a numered list with those mistakes delimited by asterisks
giving a short explanation in the format shown below:

1. "Ther" -  "There". The word "Ther" should be corrected to "There" to indicate the presence of something.

2. "hous" -  "house". The word "hous" should be corrected to "house" to spell it correctly.

3. "fishes" - "fish". The word "fishes" should be corrected to "fish" as the plural form of "fish" is already "fish."

if a word does not require correction, please skip it and do not include it in the numbered list

Here is the text delimited by triple quotes as mentioned above

`;
exports.AIPromtExpandKnowledge = `You will be provided with a text delimited by triple quotes.
Describe five ways to make the text better by improving how it is written. 
Use examples from the text and explain the improvements in simple terms that students can easily grasp
If there is no text or if the text is not in English, return "Please provide a valid text"

Here is the text delimited by triple quotes as mentioned above`;
// You will be provided with a text delimited by triple quotes. 
// It will contain a text in English that may or may not have spelling, grammar or vocabulary mistakes.
// Once you have the text, you need to return the same text and not do any correction. You only need to delimit each word or sentence that has a spelling, grammar or vocabulary mistake in asterisks. Words and sentences with correct grammar, spelling and vocabulary should not be delimited.
// Here is a sample input 
// """
// Ther is a cat in the hous. It is sitting on the table and looking at the fishes tank. The cat are very cute and playful.
// There is also a dog in the gardn. It likes to chase the balls and play with childran. The dog is very friendli.
// // """
// and here is a sample output 
// """
// *Ther* is a cat in the *hous*. It is sitting on the table and looking at the *fishes* tank. The *cat* *are* very cute and playful.
// There is also a dog in the *gardn*. It likes to chase the balls and play with *childran*. The dog is very *friendli*.
// """
//You will be provided with a text delimited by triple quotes. 
// It will contain a text in English that may or may not have spelling, grammar or vocabulary mistakes.
// Once you have the text, you need to return the same text and not do any correction. You only need to delimit each word or sentence that has a spelling, grammar or vocabulary mistake in asterisks.
// 
// `Dame un lista de temas que debería de saber una persona para aplicar a un puesto de trabajo.
// La información que tendrás que usar para hacer la lista es la siguiente:
// -El nombre de un puesto de trabajo
// -La descripción del puesto de trabajo
// -Una lista de los conocimientos que una persona posee actualmente
// Una vez te pase esta información, dame una lista de los temas que debería de saber un usuario para poder aplicar al puesto y por qué debería de estudiarlo,
// también dependiendo de sus habilidades actuales, dime si crees que ya sabe sobre el tema o no.
// Si alguna habilidad del usuario no tiene relacion con el puesto, no agregues esa habilidad.
// El formato de solicitud JSON será el siguiente:
// {
//   "puesto": [puesto],
//   "descripcion": [descripcion],
//   "Habilidades": [Habilidad 1, habilidad 2, habilidad 3]
// }
// El formato de respuesta JSON será el siguiente:
// [
//     {
//       "tema": [tema],
//       "aprendido": [aprendido],
//       "mensaje": [mensaje],
//     },
//     {
//       "tema": [tema],
//       "aprendido": [aprendido],
//       "mensaje": [mensaje]
//     }
// ]
// Tienes que cambiar lo que hay entre corchetes por el valor.
// Este es un ejemplo:
// Solicitud
// {
//   "puesto": "Desarrollador REACTJS REMOTO 100%",
//   "Habilidades": ["HTML", "CSS", "Photo Shop"]
//   "descripcion": "En Métrica Consulting empresa de reconocido prestigio nacional e internacional, líder en el sector IT, nos encontramos en la búsqueda de perfiles de Desarrollo REACTJS, con al menos 2 años de experiencia y experiencia en Pruebas Unitarias (JEST)
//   Se ofrece:
//   Contrato indefinido y trabajo en REMOTO desde casa
//   Proyecto remoto de muy larga duración
//   Flexibilidad Horaria
//   Retribución Flexible
//   Formación Continua"
// }
// Tu respuesta
// [
//   {
//     "tema": "HTML",
//     "aprendido": "Si",
//     "mensaje": "Ya tienes conocimientos en HTML, lo cual es beneficioso para el puesto de Desarrollador REACTJS. HTML es el lenguaje de marcado estándar para crear páginas web, y aunque ReactJS se basa en JavaScript, tener un conocimiento sólido de HTML es útil para construir componentes de interfaz de usuario."
//   },
//   {
//     "tema": "CSS",
//     "aprendido": "Si",
//     "mensaje": "También tienes conocimientos en CSS, lo cual es beneficioso para el puesto de Desarrollador REACTJS. CSS se utiliza para dar estilo y diseño a las páginas web, y trabajar con ReactJS implica trabajar con estilos y componentes visuales, por lo que tener experiencia en CSS es valiosa."
//   }
//   {
//     "tema": "JavaScript",
//     "aprendido": "No",
//     "mensaje": "Debes tener conocimientos en JavaScript, ya que es el lenguaje principal utilizado en el desarrollo con ReactJS. JavaScript es un lenguaje de programación ampliamente utilizado en el desarrollo web y es fundamental para trabajar con ReactJS y crear funcionalidades interactivas en las aplicaciones web."
//   },
//   {
//     "tema": "ReactJS",
//     "aprendido": "No",
//     "mensaje": "Debes saber ReactJS porque es el principal requisito para el puesto de Desarrollador REACTJS. ReactJS es una biblioteca de JavaScript ampliamente utilizada para construir interfaces de usuario interactivas y reutilizables."
//   },
//   {
//     "tema": "Pruebas Unitarias (Jest)",
//     "aprendido": "No",
//     "mensaje": "Debes tener experiencia en Pruebas Unitarias con Jest, ya que es un requisito específico mencionado en la descripción del puesto. Jest es un marco de pruebas de JavaScript ampliamente utilizado para realizar pruebas unitarias en aplicaciones ReactJS."
//   },
// ]
// Recuerda que debes darme la respuesta en el formato JSON solicitado. No agregues nada mas que la respuesta en formato JSON`
