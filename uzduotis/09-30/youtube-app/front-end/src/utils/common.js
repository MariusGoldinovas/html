export const extractFormData = (target) => {
    const data = {};
    
    const form = new FormData(target);

    for(const entry of form.entries()) {
        data[entry[0]] = entry[1];
    }
    
    return data;
}

export const formatTimeAgo = (date) => {

    let difference = Date.now() - Date.parse(date);

    let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    if(daysDifference > 0)
        return daysDifference + ' days ago';

    if(hoursDifference > 0)
        return hoursDifference + ' hours ago';

    if(minutesDifference > 0)
        return minutesDifference + ' minutes ago';

    return 'just now';
};

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    return `${date.getDate()} ${months[date.getMonth() - 1]} ${date.getFullYear()}`;
};