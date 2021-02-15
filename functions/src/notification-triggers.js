// src/notification-triggers.js

// default notification values (useful cuz writes over `time`, `read`)
const defaults = (admin) => ({
    title: 'DEFAULT TITLE',
    description: 'DEFAULT DESCRIPTION',
    type: 'Error',
    time: admin.firestore.Timestamp.now(),
    read: false,
});


module.exports.onCreateStudy = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const study = snapshot.data();

    return firestore
        .collection('researchers').doc(study.researcher.id)
        .collection('notifications').set({
            ...defaults(admin),
            title: 'New Study Created',
            description: `A new study with id "${study.nctID}" has been created.`,
            type: 'CREATE',
        });
};

module.exports.onDeleteStudy = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const study = snapshot.data();

    return firestore
        .collection('researchers').doc(study.researcher.id)
        .collection('notifications').set({
            ...defaults(admin),
            title: 'Study Deleted',
            description: `Your study with id "${study.nctID}" has been deleted.`,
            type: 'DELETE',
        });
};