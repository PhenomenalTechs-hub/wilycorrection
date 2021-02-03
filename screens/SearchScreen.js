import React from 'react';
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import db from '../config'

export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state = {
      allTransactions:[],
      lastVisibleTransaction: null
    }
  }
  componentDidMount = async() => {
    const query = await db.collection('transactions').get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions:[...this.state.allTransactions, doc.data()]
      })
    })
  }

  fetchMoreTransactions = async() => {
    const query = await db.collection('transactions').startAfter(this.state.lastVisibleTransaction).limit(2).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions, doc.data()],
        lastVisibleTransaction:doc
      })
    })
  }

    render() {
      return (
        <FlatList data = {this.state.allTransactions}
        renderItem = {({item}) => (
          <View style={{borderBottomWidth:2}}>
                  <Text>{"Book Id: "+item.bookId}</Text>
                  <Text>{"Student Id: "+item.studentId}</Text>
                  <Text>{"Date: "+item.date.toDate()}</Text>
                  <Text>{"Transaction Type: "+item.transactionType}</Text>
          </View>
        )}
        keyExtractor = {(item,index) => index.toString()}
        onEndReached = {this.fetchMoreTransactions}
        onEndReachedThreshold = {0.2} />
      );
    }
  }