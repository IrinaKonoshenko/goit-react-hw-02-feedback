import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Component } from 'react';
import { Section } from './Secion/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  }

  countTotalFeedback() {
    return this.state.good + this.state.neutral + this.state.bad;
  }

  countPositiveFeedbackPercentage() {
    const percentage = (this.state.good / this.countTotalFeedback()) * 100;
    return isNaN(percentage) ? 0 : percentage;
  }

  onLeaveFeedback = type => {
    if (type === 'clear') {
      this.setState({ good: 0, neutral: 0, bad: 0 });
      return;
    }
    this.setState({ [type]: this.state[type] + 1 });
  };

  render() {
    return (
      <div className="main">
        <div className="main__content">
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={['good', 'neutral', 'bad', 'clear']}
              onLeaveFeedback={this.onLeaveFeedback}
            />
          </Section>
          <Section title="Statistics">
            {this.countTotalFeedback() ? (
              <Statistics
                good={this.state.good}
                neutral={this.state.neutral}
                bad={this.state.bad}
                total={this.countTotalFeedback()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            ) : (
              <div className="empty">
                <Notification message="There is no feedback" />
              </div>
            )}
          </Section>
        </div>
      </div>
    );
  }
}
