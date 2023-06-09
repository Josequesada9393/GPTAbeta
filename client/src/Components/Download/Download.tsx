import React, { useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { actionHighlight, actionList, actionSuggestion } from '../../Actions/actions';
import { useDispatch, useSelector} from 'react-redux';
import { WholeState } from '../../Types/Types';
import GPTA from '../GPTA';




const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });


  // Create Document Component
  const Download = () => {
    const GPTAstate = useSelector((state: WholeState) => state.GPTA)

    useEffect(() => {
    
    }, [GPTAstate.highlightResult])
  return (
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{GPTAstate.highlightResult}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )}

export default Download