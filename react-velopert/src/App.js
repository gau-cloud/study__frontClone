import './App.css';
import PhoneForm from './components/PhoneForm';
import React, { Component } from 'react';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 3;

  state={
    information: [
      {
        id: 0,
        name: 'lee',
        phone: '010-1111-1111'
      },
      {
        id: 1,
        name: 'kim',
        phone: '010-2222-2222'
      },
      {
        id: 2,
        name: 'park',
        phone: '010-3333-3333'
      },
    ],

    keyword: '',
  }

  handleChange = (e) =>{
    this.setState({
      keyword: e.target.value
    })
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
        information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    });
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) =>{
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if(info.id === id){
            return {
              id,
              ...data,
            };
          }
          return info;
        }
      )
    })
  }

  render(){
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <input 
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="검색..."
        />
        <PhoneInfoList 
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
        {/* {JSON.stringify(this.state.information)} */}
      </div>
    );
  }
}

export default App;
