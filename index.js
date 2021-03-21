var dept = [];

dept.push({value:125000, payOff : 600,interest:3, interestPeriod : 12});
dept.push({value:6000,payOff : 200,interest:3, interestPeriod : 1});
dept.push({value:6000,payOff : 200,interest:5, interestPeriod : 3});
dept.push({value:6000,payOff : 200,interest:7, interestPeriod : 12});
dept.push({value:125000,payOff : 600,interest:7, interestPeriod : 12});

//ToDo : add the ability to have and array of interest and pay of values so they can change after x payments
//ToDo : add the function to show how much faster or slower the debt will be paid with different payoff amounts

var totalPayOff = 0;
var payments = 0;
var amountOfInterest = 0;
var deptProfiles = [];
while (dept.length > 0) {
    var currentValue = dept.pop();

    var result = runDeptPayOff(currentValue);
    payments += result.payments;
    totalPayOff += result.amountPaidOff;
    amountOfInterest += result.amountOfInterestOnDept;
    deptProfiles.push([...result.datPoints]);
}

console.dir(deptProfiles);

console.log(`${totalPayOff} paid off in ${payments} payments (${amountOfInterest})`);

function runDeptPayOff(dept)
{
    var amount = dept.value;
    var interest = dept.interest;
    var interestPeriod = dept.interestPeriod;
    var payOffValue = dept.payOff;

    console.log(`Amount to pay ${amount} interest of ${interest} interest accrued after every ${interestPeriod} payments`);

    var paidOfDuringInterestPeriod = 0;
    var interestDuringInterestPeriod = 0;
    var interestAmount = 0;
    var output = {
        payments : 0,
        amountPaidOff : 0,
        amountOfInterestOnDept : 0,
        datPoints : []
    };
    while (amount > 0) {
        
        var paidOffValue = payOffValue;
        output.datPoints.push([amount,output.amountOfInterestOnDept,paidOffValue,interestAmount,paidOfDuringInterestPeriod,interestDuringInterestPeriod]);
        amount -= paidOffValue;
        
        if(amount > 0  && interest > 0 && output.payments % interestPeriod == 0){
            var amountOfCurrentInterest = (amount * (interest/100))
            //console.log(`amount of interest ${amountOfInterest} (${amount})`);
            output.amountOfInterestOnDept += amountOfCurrentInterest;
            interestDuringInterestPeriod += amountOfCurrentInterest;
            interestAmount += amountOfCurrentInterest;
        }

        output.payments++;

        if(amount < 0)
        {   
            paidOffValue = paidOffValue + amount;
            amount = 0;
        }
        if(amount == 0 && interestAmount > 0)
        {
            paidOffValue = payOffValue;
            interestAmount -= paidOffValue;
        }
        if(amount == 0 && interestAmount < 0)
        {   
            paidOffValue = paidOffValue + interestAmount;
            interestAmount = 0
        }
        output.amountPaidOff += paidOffValue;
        paidOfDuringInterestPeriod += paidOffValue;

        //console.log(`value left ${amount} paid of ${paidOffValue} interest ${interestAmount}`);
        if(output.payments % interestPeriod == 0){
            //console.log(`actually paid off (${paidOfDuringInterestPeriod-InterestDuringInterestPeriod}) ; paidOfDuringInterestPeriod ${paidOfDuringInterestPeriod} InterestDuringInterestPeriod${InterestDuringInterestPeriod}`);
            paidOfDuringInterestPeriod=0;
            interestDuringInterestPeriod=0;
        }
        
    }

    return output;
}