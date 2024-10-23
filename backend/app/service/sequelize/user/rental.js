const { Rental, Unit, Penalty, User, RentalUnit, sequelize } = require("../../../../models");
const { NotFoundError, BadRequestError } = require("../../../errors");

const getUserRentals = async (req) => {
    const userId = req.user?.user?.id;

    if (!userId) {
        throw new BadRequestError("User ID is required");
    }

    const rentals = await Rental.findAll({
        where: { userId },
        include: [
            {
                model: Unit,
                through: { attributes: [] }, // Exclude RentalUnit attributes
            },
            {
                model: Penalty,
                attributes: ["amount", "reasons"],
            },
        ],
    });

    return rentals;
};

const createRental = async (req) => {
    const userId = req.user?.user?.id;
    const { units, rentalDosate } = req.body;

    if (!userId) {
        throw new BadRequestError("User ID is required");
    }

    if (!Array.isArray(units) || units.length === 0 || units.length > 2) {
        throw new BadRequestError("You must not rent more than 2 units");
    }

    if (!rentalDate) {
        throw new BadRequestError("Rental date is required");
    }

    const t = await sequelize.transaction();

    try {
        // Calculate the total amount based on the unit prices
        let amount = 0;
        for (const unitId of units) {
            const unit = await Unit.findByPk(unitId);
            if (!unit || !unit.isAvailable) {
                throw new BadRequestError(`Unit with id ${unitId} is not available`);
            }
            amount += unit.price;
        }

        // Create the rental
        const rental = await Rental.create(
            {
                userId,
                rentalDate,
                returnDate: null, // Will be set when the rental is returned
                isReturned: false,
                amount,
            },
            { transaction: t },
        );

        // Create entries in RentalUnit for each unit
        for (const unitId of units) {
            await RentalUnit.create({ rentalId: rental.id, unitId }, { transaction: t });
        }

        await t.commit();

        return rental;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = {
    getUserRentals,
    createRental,
};
