import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/collections/questions';
import { QuestionBase } from '../imports/collections/questionBase';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  Meteor.publish('questions',function(){
    return Questions.find({});
  });
});

Meteor.methods({
    'sendResult': function(result){
        if(result.response == globalAnswer){
          /*
          Meteor.users.update(Meteor.userId(), {
            $set: {
              points:
            }
          });
          */
        }
    },
    'start': function(time){
        Questions.remove({});//ONLY REMOVE QUESTIONS OF ROOM
        const questions = QuestionBase.find({}).fetch();
        var i = 0;
        var cycle = Meteor.setInterval(function(){
          if (i < questions.length) {
            globalAnswer = questions[i].answer;
            Questions.insert(questions[i]);
          }
          else{
            clearInterval(cycle);
            Questions.remove({});
          }
          i = i+1;
        }, time);
    }
});
