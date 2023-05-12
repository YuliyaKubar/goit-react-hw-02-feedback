import { Component } from "react";
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedBackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from "./Notification/Notification";


export class App extends Component {
   state = {
        good: 0,
        neutral: 0,
        bad: 0
    }


  onLeaveFeedback = ({ target: { name } }) => {
    this.setState(prevState => ({
      [name]: prevState[name] + 1
    }))
  }

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }

  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  }
  
  render() {
 
  return (
    <div>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(this.state)}
          onLeaveFeedback={this.onLeaveFeedback} />
      </Section>
      <Section title={'Statistics'}>
        {this.countTotalFeedback() > 0 ?
          <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage()}
            />
            : <Notification message={'There is feedback'} />  
        }
      </Section>
      </div>
  )
}
}

