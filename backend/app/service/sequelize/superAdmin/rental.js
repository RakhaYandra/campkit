const { Rental, Unit, Penalty, User } = require("../../../../models");
const { NotFoundError, BadRequestError } = require("../../../errors");

const getRentals = async (req) => {
    const rentals = await Rental.findAll({
        include: [
            {
                model: Unit,
                through: { attributes: [] }, // Exclude RentalUnit attributes
            },
            {
                model: Penalty,
                attributes: ["amount", "reasons"],
            },
            {
                model: User,
                attributes: ["fullName", "email"],
            },
        ],
    });

    return rentals;
};

const updateRentalStatus = async (req) => {
    const { id } = req.params;
    const { isReturned } = req.body;

    if (typeof isReturned !== "boolean") {
        throw new BadRequestError("isReturned must be a boolean");
    }

    const rental = await Rental.findByPk(id);

    if (!rental) {
        throw new NotFoundError("Rental not found");
    }

    rental.isReturned = isReturned;

    if (isReturned) {
        // Set the returnDate to the current date
        rental.returnDate = new Date();

        // Check if the returnDate exceeds 5 days from the rentalDate
        const rentalDate = new Date(rental.rentalDate);
        const returnDate = new Date(rental.returnDate);
        const maxReturnDate = new Date(rental.maxReturnDate);

        if (returnDate > maxReturnDate) {
            // Apply penalty
            const penaltyAmount = calculatePenalty(returnDate, maxReturnDate);
            await Penalty.create({
                rentalId: rental.id,
                amount: penaltyAmount,
                reasons: "Late return",
            });
        }
    }

    await rental.save();

    return rental;
};

const calculatePenalty = (returnDate, maxReturnDate) => {
    const daysLate = Math.ceil((returnDate - maxReturnDate) / (1000 * 60 * 60 * 24));
    const penaltyRate = 10; // Example penalty rate per day
    return daysLate * penaltyRate;
};

module.exports = {
    getRentals,
    updateRentalStatus,
};
