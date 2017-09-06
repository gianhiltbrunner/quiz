import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/collections/questions';
import { Statistics } from '../imports/collections/stats';
import { QuestionBase } from '../imports/collections/questionBase';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  Meteor.publish('questions',function(){
    return Questions.find({});
  });
});

Accounts.onCreateUser(function(options, user) {
    user.points = 0
    Statistics.upsert({
        userid: Meteor.userId()
    }, {
        $set: {
            name: Meteor.user().username,
            points: 0
        }
    });
    return user
});

Meteor.methods({
    'sendResult': function(result){
        if(result.response == globalAnswer){
          const points = Meteor.user().points + 1;
          Meteor.users.update(Meteor.userId(), {//REMOVE METEOR USER DATA ACESS!!
            $set: {
              points: points
            }
          });
          Statistics.upsert({
              userid: Meteor.userId()
          }, {
              $set: {
                  name: Meteor.user().username,
                  points: points
              }
          });
        }
    },
    'start': function(time){
        Meteor.users.update({}, {//SET TO 0
          $set: {
            points: 0
          }
        }, {multi: true}); //RESET POINTS
        Statistics.update({},
        {
            $set: {
                points: 0
            }
        }, { multi: true });
        Questions.remove({});//ONLY REMOVE QUESTIONS OF ROOM
        Statistics.remove({});

        const questions = QuestionBase.find({}).fetch();
        var i = 0;
        var cycle = Meteor.setInterval(function(){//GAME TIMING
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
