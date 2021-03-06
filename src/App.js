import React, { Component } from 'react';
import './App.css';
import linePlot from './linePlot';
import quartileTable from './quartileTable';
import data from './processed.json';

class App extends Component {
  constructor(props){
    super(props);
    const initial_index = Math.floor(Math.random() * data.length);
    this.gender_dict = {'F': 'women', 'M': 'men'};
    this.state = data[initial_index];
    this.state.new_gender = this.state.gender;
    this.state.new_name = this.state.name;
  }

  update() {
    const new_name = this.state.new_name.toLowerCase();
    const desired_gender = this.state.new_gender || this.state.gender;

    const possible_data = data.filter( (element) => (element.name.toLowerCase() === new_name) && (element.gender === desired_gender));

    if (possible_data.length === 0) {
      alert(`Not enough data to show for ${this.gender_dict[desired_gender]} with name ${new_name}`);
      this.setState({new_name: '', new_gender: 'F'});
      return;
    }

    this.setState(possible_data[0]);
  }

  updateName(event) {
    this.setState({new_name: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Age Estimator. Working with {this.gender_dict[this.state.gender]} named {this.state.name}.</h1>
        </header>

        <div style={{width:'85%', margin: '0 auto'}}>
        {linePlot(this.state)}

        <p>
        The graph above shows the age distribution for people named {this.state.name}. Information is derived from the <a href="https://catalog.data.gov/dataset/baby-names-from-social-security-card-applications-national-level-data">Social Security name database</a> for birth rates, and the <a href="https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk">census age distribution</a>.
        The assumption is made that survival rates are independent of name.
        </p>

        <p>
        The two bars indicate the 25th and 75th percentile, respectively. The median is indicated by the dot.
        </p>

        <p>
        The quartile information is summarized below:
        </p>

        {quartileTable(this.state)}

        </div>
        <div className='footer'>
          <div>Try a new name:</div>
          <div>
            <input type='text' value={this.state.new_name} onChange={(e)=>this.updateName(e)}/>
          </div>
          <div>
            <select onChange={(e) => this.setState({new_gender: e.target.value})} value={this.state.new_gender}>
              <option value='F'>Female</option>
              <option value='M'>Male</option>
            </select>
          </div>
          <div>
            <button onClick = {() => this.update()}>Update</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
