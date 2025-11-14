// Audi VIN Decoder
const audiVinDecoder = {
    // WMI (World Manufacturer Identifier) mapping
    wmiCodes: {
        'WAU': 'Audi AG (passenger cars), Ingolstadt, Germany',
        'WA1': 'Audi AG (MPV/SUV models), Ingolstadt, Germany',
        'WUA': 'Audi Sport GmbH (performance cars, e.g. RS models), Neckarsulm, Germany',
        'WU1': 'Audi Sport GmbH (MPV/SUV, e.g. Q8), Neckarsulm, Germany',
        'TRU': 'Audi Hungaria (passenger cars; Győr, Hungary)',
        '3VW': 'Volkswagen de México (SV, e.g. Audi Q5)',
        '8X3': 'Audi Brazil (certain models for regional markets)',
        '8G1': 'Audi Belgium (Brussels plant; e‑tron electric models)',
        '93U': 'Audi South America (Brazil)',
        '8TK': 'FAW‑Volkswagen joint venture – Audi (China)',
        '8W3': 'Volkswagen India – Audi (India)'
    },

    // 4th character - Series/Trim
    seriesCodes: {
        'A': 'A6 (base sedan); in A4 models this might mean base A4',
        'B': 'S6 (sedan)',
        'L': 'A8 (long-wheelbase)',
        'M': 'A8 L (extended sedan)',
        'P': 'S8 (sedan)'
    },

    // 5th character - Engine Type / Displacement
    engineCodes: {
        'D': '3.2L V6 (250 hp)',
        'E': '2.0L I4 (121 cid, 200 hp)',
        'H': '3.2L V6 (255 hp)',
        'K': '3.2L V6 (265 hp)',
        'L': '4.2L V8 (344 hp)',
        'N': '5.2L V10 (435–450 hp)',
        'R': '6.0L V12 (450 hp)',
        'U': '4.2L V8 (420 hp)',
        'V': '4.2L V8 (350–354 hp)',
        'Y': '3.6L V6 (280 hp)'
    },

    // 6th character - Restraint System
    restraintCodes: {
        '0': 'Active (manual) belts, no airbags',
        '2': 'Passive (automatic) belts',
        '4': 'Motorized (tightening) belts',
        '5': 'Driver Airbag + passenger active belt',
        '8': 'Driver + Passenger Airbags'
    },

    // 7th and 8th character - Model/Platform
    modelCodes: {
        '8P': 'A3 (sedan/cabriolet, 8P platform)',
        '8E': 'A4/S4/RS4 (B8 platform)',
        '8H': 'A4/S4 Cabriolet (B8 platform)',
        '8T': 'A5/S5 (B8 platform)',
        '4F': 'A6/S6 (C6 platform)',
        '4E': 'A8/S8 (D4/C7 platform)',
        '4L': 'Q7 (4L platform)',
        '42': 'R8 (42 platform)',
        '8J': 'TT (8J platform)'
    },

    // 11th character - Assembly Plant
    assemblyPlants: {
        'A': 'Ingolstadt, Germany',
        'B': 'Brussels, Belgium',
        'D': 'Bratislava, Slovakia',
        '1': 'Győr, Hungary',
        '2': 'San José Chiapa (Puebla), Mexico',
        'K': 'Karmann (Osnabrück/Rheine), Germany',
        'N': 'Neckarsulm, Germany'
    },

    // Main decoding function
    decodeVIN: function(vin) {
        if (!vin || vin.length < 11) {
            return { error: 'VIN must be at least 11 characters long' };
        }

        const result = {
            isAudi: false,
            details: {}
        };

        // Check if it's an Audi VIN
        const wmi = vin.substring(0, 3);
        if (this.wmiCodes[wmi]) {
            result.isAudi = true;
            result.details.manufacturer = this.wmiCodes[wmi];
            
            // Get series/trim (4th character)
            const seriesCode = vin[3];
            result.details.series = this.seriesCodes[seriesCode] || 'Unknown series';

            // Get engine type (5th character)
            const engineCode = vin[4];
            result.details.engine = this.engineCodes[engineCode] || 'Unknown engine';

            // Get restraint system (6th character)
            const restraintCode = vin[5];
            result.details.restraintSystem = this.restraintCodes[restraintCode] || 'Unknown restraint system';

            // Get model/platform (7th and 8th characters)
            const modelCode = vin.substring(6, 8);
            result.details.model = this.modelCodes[modelCode] || 'Unknown model';

            // Get assembly plant (11th character)
            const plantCode = vin[10];
            result.details.assemblyPlant = this.assemblyPlants[plantCode] || 'Unknown assembly plant';

            // Get year from 10th character (using global vinYearMap)
            const yearCode = vin[9];
            if (typeof vinYearMap !== 'undefined' && vinYearMap[yearCode]) {
                const years = vinYearMap[yearCode];
                result.details.productionYear = years.join(' or ');
            }
        }

        return result;
    }
};