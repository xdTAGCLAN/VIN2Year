// Tesla VIN Decoder
const teslaVinDecoder = {
    // 4th character - Model codes
    modelCodes: {
        '3': 'Tesla Model 3',
        'R': 'Tesla Roadster',
        'S': 'Tesla Model S',
        'X': 'Tesla Model X',
        'Y': 'Tesla Model Y'
    },

    // 5th character - Body type [and GVWR index for Model X]
    bodyTypes: {
        'A': 'Hatchback, 5-door, LHD',
        'B': 'Hatchback, 5-door, RHD',
        'C': 'Minivan, 5-door, LHD, 6001-7000 lbs (2722-3175 kg)',
        'D': 'Minivan, 5-door, RHD, 6001-7000 lbs (2722-3175 kg)',
        'E': 'Roadster/Convertible, LHD'
    },

    // 6th character - Region for Roadster, Safety systems for Model *
    safetySystems: {
        // For Tesla Roadster - Region
        '1': 'United States',
        
        // For Tesla Model * - Safety systems
        '1': 'Inertial seat belts, front airbags, side curtain airbags, knee airbags, with occupancy sensor',
        '2': 'Inertial seat belts with pretensioners, front airbags, side airbags for both rows, knee airbags',
        '3': 'Inertial seat belts, front airbags, side curtain airbags, knee airbags',
        '4': 'Inertial seat belts with pretensioners, front airbags, side curtain airbags, knee airbags',
        'A': 'Inertial seat belts with pretensioners, front airbags, side curtain airbags, knee airbags (Model X)',
        'B': 'Inertial seat belts with pretensioners, front airbags, side curtain airbags (Model X)'
    },

    // 7th character - Safety systems for Roadster, Battery/Charging for Model *
    batteryCharging: {
        // For Tesla Roadster - Safety systems
        '1': 'Inertial seat belts and front airbags',
        'A': 'Inertial seat belts with pretensioners and front airbags (from 2010 model year)',
        
        // For Tesla Model * - Battery type or charging system
        'A': '10 kW charger',
        'B': '20 kW charger',
        'C': '10 kW charger with DC fast charging',
        'D': '20 kW charger with DC fast charging',
        'E': 'Electric',
        'H': 'High capacity lithium-ion battery',
        'S': 'Standard capacity lithium-ion battery'
    },

    // 8th character - Powertrain
    powertrain: {
        '1': 'Single 3-phase AC motor Tesla M6B ("standard")',
        '2': 'Dual 3-phase AC motors Tesla M6B ("standard")',
        '3': 'Single 3-phase AC motor Tesla M6S ("performance")',
        '4': 'Dual 3-phase AC motors Tesla M6S ("performance")',
        'B': 'Tesla 56C with 2-speed gearbox',
        'C': '"Base" AC motor, 2-component battery (31-40 kWh)',
        'G': '"Base" AC motor, 4-component battery (51-60 kWh)',
        'N': '"Base" AC motor, 7-component battery (81-90 kWh)',
        'P': '"Performance" AC motor, 7-component battery (81-90 kWh)'
    },

    // 11th character - Manufacturing location
    manufacturingPlants: {
        '1': 'Menlo Park (USA)',
        '3': 'Hethel (UK)',
        'F': 'Fremont (California, USA)',
        'P': 'Palo Alto (California, USA)'
    },

    // 12th character - Development and production phase (likely only until 2012)
    productionPhase: {
        '0': 'Series production vehicle',
        'A': 'Alpha prototype',
        'B': 'Beta prototype',
        'F': 'Founder series vehicle',
        'P': 'Production vehicle',
        'R': 'Release candidate vehicle',
        'S': 'Signature series vehicle'
    },

    // Main decoding function
    decodeVIN: function(vin) {
        if (!vin || vin.length < 12) {
            return { error: 'VIN must be at least 12 characters long for Tesla decoding' };
        }

        const result = {
            isTesla: false,
            details: {}
        };

        // Check if it's a Tesla VIN
        const wmi = vin.substring(0, 3);
        if (wmi === '5YJ' || wmi === 'SFZ') {
            result.isTesla = true;

            // Get model (4th character)
            const modelCode = vin[3];
            result.details.model = this.modelCodes[modelCode] || 'Unknown Tesla model';

            // Get body type (5th character)
            const bodyCode = vin[4];
            result.details.bodyType = this.bodyTypes[bodyCode] || 'Unknown body type';

            // Determine if it's Roadster or Model *
            const isRoadster = modelCode === 'R';

            // Get region/safety systems (6th character)
            const safetyCode = vin[5];
            if (isRoadster) {
                result.details.region = this.safetySystems[safetyCode] || 'Unknown region';
            } else {
                result.details.safetySystems = this.safetySystems[safetyCode] || 'Unknown safety systems';
            }

            // Get safety systems/battery charging (7th character)
            const batteryCode = vin[6];
            if (isRoadster) {
                result.details.roadsterSafety = this.batteryCharging[batteryCode] || 'Unknown safety systems';
            } else {
                result.details.batteryCharging = this.batteryCharging[batteryCode] || 'Unknown battery/charging system';
            }

            // Get powertrain (8th character)
            const powertrainCode = vin[7];
            result.details.powertrain = this.powertrain[powertrainCode] || 'Unknown powertrain';

            // Get manufacturing plant (11th character)
            const plantCode = vin[10];
            result.details.manufacturingPlant = this.manufacturingPlants[plantCode] || 'Unknown manufacturing plant';

            // Get production phase (12th character)
            const phaseCode = vin[11];
            result.details.productionPhase = this.productionPhase[phaseCode] || 'Unknown production phase';

            // Get year from 10th character (using existing year mapping)
            const yearCode = vin[9];
            const years = vinYearMap[yearCode];
            if (years) {
                result.details.productionYear = years.join(' or ');
            }
        }

        return result;
    }
};