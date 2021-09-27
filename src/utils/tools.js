

export const firebaseLooper = (snapshot) => {
    let data = [];
    snapshot.forEach( doc => {
        data.push({
            ...doc.data(),
            id: doc.id
        })
    })
    //console.log(data);
    return data;
}