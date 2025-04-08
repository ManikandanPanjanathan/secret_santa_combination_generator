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
                Secret_Child_Name: receiver['Employee_Name'],
                Secret_Child_EmailID: receiver.Employee_EmailID
            });
        }
    }

    return assignments;
};

module.exports = { getRandomPairings };