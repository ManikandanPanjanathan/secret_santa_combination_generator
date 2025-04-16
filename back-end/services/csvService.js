const getRandomPairings = (employees, previousAssignments) => {
    const previousMap = new Map(
        previousAssignments.map((a) => [a.Employee_EmailID, a.Secret_Child_EmailID])
    );

    const shuffled = [...employees];
    let isValid = false;
    let assignments = [];

    while (!isValid) {
        isValid = true;
        assignments = [];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        for (let i = 0; i < employees.length; i++) {
            const giver = employees[i];
            const receiver = shuffled[i];

            let isFieldsPresent = false;
            if (giver['Employee_Gender'] && giver['Employee_Team']) {
                isFieldsPresent = true
            }

            // let constraints = false
            if (isFieldsPresent) {
                if (previousMap.get(giver.Employee_EmailID) !== receiver.Employee_EmailID) {
                    if (giver?.Employee_Gender === receiver?.Employee_Gender) {
                        // constraints = true
                        isValid = false;
                        break;
                    } else if (giver?.Employee_Team === receiver?.Employee_Team) {
                        isValid = false;
                        break;
                    }
                }
            }

            if (
                giver.id === receiver.id ||
                previousMap.get(giver.Employee_EmailID) === receiver.Employee_EmailID
            ) {
                isValid = false;
                break;
            }

            assignments.push({
                Employee_Name: giver['Employee_Name'],
                Employee_EmailID: giver.Employee_EmailID,
                Employee_Gender: giver.Employee_Gender ?? '',
                Employee_Team: giver?.Employee_Team ?? '',
                Secret_Child_Name: receiver['Employee_Name'],
                Secret_Child_EmailID: receiver.Employee_EmailID,
                Secret_Child_Gender: receiver?.Employee_Gender ?? '',
                Secret_Child_Team: receiver?.Employee_Team ?? '',
            });
        }
    }

    return assignments;
};

module.exports = { getRandomPairings };