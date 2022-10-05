
function generateSlots(){
    let start_hr = 8
    let start_min = 0
    let end_hr = 19
    let end_min = 0
    let credit_time = 50
    var slots = []
    while (true){
        if(start_hr === 13){
            start_hr += 1
            continue
        }
        let slot = addLeadingZero(start_hr)+":"+addLeadingZero(start_min)
        start_min += credit_time
        if(start_min >= 60){
            start_min -= 60
            start_hr += 1
        }
        slot += "-"+addLeadingZero(start_hr)+":"+addLeadingZero(start_min)
        slots.push(slot)
        if(start_hr >= end_hr && start_min >= end_min){
            break
        }

    }
    return slots
}   

function addLeadingZero(val){
    return val.toString().padStart(2, '0')
}

export default generateSlots