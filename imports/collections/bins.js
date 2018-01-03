import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'bins.insert': function() {
        return Bins.insert({
            createdAt: new Date(),
            content: '',
            sharedWith: [],
            ownerId: this.userId,
            owner: {
                id: this.userId,
                email: Meteor.users.findOne(this.userId).emails[0].address
            }
        });
    },
    'bins.remove': function(bin) {
        if ( Meteor.userId() === bin.ownerId) {
            return Bins.remove(bin);
        } else {
            return;
        }

    },
    'bins.update': function(bin, content) {
        // es6 syntax is same as { $set: { content: content }}
        return Bins.update(bin._id, { $set: { content } });
    },
    'bins.share': function(bin, email) {
        // See if email is already in array
        let sharedWithList = bin.sharedWith;
        let index = sharedWithList.indexOf(email);
        if (index > -1) {
            return;
        } else {
            // push email into array of sharedWith of current bin
            return Bins.update(bin._id, { $push: { sharedWith: email }});
        }

    },
    'bins.share.remove': function(bin, email) {
        let sharedWithList = bin.sharedWith;
        let index = sharedWithList.indexOf(email);
            if (index > -1) {
                sharedWithList.splice(index, 1);
                return Bins.update(bin._id, { $set: { sharedWith: sharedWithList }});
            } else {
                return;
            }
    }
});

export const Bins = new Mongo.Collection('bins');
