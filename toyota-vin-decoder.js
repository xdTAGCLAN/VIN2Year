// Toyota VIN Decoder
const toyotaVinDecoder = {
    // European market before 2002
    europeanPre2002: {
        // 4th and 5th character - Body type
        bodyType: {
            '11': 'Jeep, minivan with standard roof',
            '12': 'Minivan with raised roof',
            '21': 'Van with standard roof',
            '22': 'Van with raised roof',
            '23': 'Van with high roof',
            '31': 'Pickup with regular cab',
            '32': 'Pickup with extended cab',
            '33': 'Pickup with double cab',
            '41': 'Microbus with standard roof',
            '42': 'Microbus with raised roof',
            '43': 'Microbus with high roof',
            '52': 'Hatchback, 3 doors',
            '53': 'Sedan',
            '54': 'Hatchback, 5 doors',
            '63': 'Coupe',
            '64': 'Liftback',
            '72': 'Station wagon',
            'LB': 'Liftback, 3 doors',
            'LC': 'Liftback, 5 doors'
        },

        // 6th character - Engine
        engine: {
            'A': '4A-FE, 7A-FE [Lean Burn] (1.6L, 16V, gasoline)',
            'B': '3B, 11B, 13B, 14B, 15B',
            'C': '1C, 2C, 2CT, 2CT-E (2.0L, 8V, diesel)',
            'E': '2E, 3E, 4E, 5E',
            'F': '1MZ-FE (3.0L V6, 24V, gasoline)',
            'G': '1G',
            'H': '2H, 12H',
            'J': '1JZ, 2JZ',
            'K': '5K, 7K',
            'L': '2L, 3L, 5L',
            'M': '5M',
            'P': '1HZ',
            'R': '21R (2.0L, gasoline)',
            'S': '2S, 3S-FE (2.0L, 16V, gasoline), 4S, 5S',
            'Z': '1ZZ-FE, 3ZZ-FE (1.8L, 16V, gasoline)'
        },

        // 7th character - Model line
        modelLine: {
            'A': 'Supra/Celica',
            'B': 'Carina/Avensis',
            'C': 'Previa, Fun Cruiser (RAV4)',
            'D': 'Mega Cruiser',
            'E': 'Corolla',
            'F': 'Lexus LS400',
            'J': 'Land Cruiser',
            'H': 'Hi Ace',
            'K': 'Hi Ace',
            'L': 'Paceo, Tercel',
            'M': 'Picnic',
            'N': 'HiLux',
            'P': 'Starlet',
            'R': 'LitAce',
            'S': 'Lexus GS300, Crown',
            'T': 'Carina, Corona, Celica, Avensis',
            'U': 'Dyna 200',
            'V': 'Camry',
            'W': 'MR2',
            'X': 'Cressida',
            'Y': 'Dyna 100, Dyna 150'
        },

        // 8th and 9th character - Model codes
        modelCodes: {
            'K0': 'Carina E (T190)',
            'K1': 'Carina E (T191)',
            'N0': 'Avensis (T220)',
            'N1': 'Avensis (T221)'
        }
    },

    // European market since 2002
    europeanPost2002: {
        // 4th character - Body type and wheel formula
        bodyType: {
            'A': 'Sedan, 2 doors, 4x2',
            'B': 'Sedan, 4 doors, 4x2',
            'C': 'Coupe, 2 doors, 4x2',
            'D': 'Hatchback/Liftback, 3 or 5 doors, 4x2',
            'E': 'Station wagon, including increased capacity (e.g., Toyota Corolla Verso)',
            'F': 'Convertible, 2 doors, 4x2',
            'G': 'Station wagon, 4 doors, 4x2',
            'H': 'Station wagon, 4 doors, 4x4',
            'J': 'Pickup, 4 doors, 4x2',
            'K': 'Station wagon, 5 doors, 4x2',
            'L': 'Station wagon, 5 doors, 4x4',
            'M': 'Family station wagon (VAN), 5 doors, 4x2',
            'P': 'Pickup, 2 doors (regular cab), 4x4',
            'S': 'Hatchback/Liftback, 3 doors, 4x4',
            'T': 'Pickup, 2 doors (extended cab), 4x2',
            'Z': 'Station wagon, 5 doors, 4x2'
        },

        // 5th character - Engine
        engine: {
            'A': '4A-FE, 7A-FE (1.6L, 16V, gasoline) or 2AD-FTV (2.2L, 16V, turbo diesel, 150 hp from 2005)',
            'B': '2AD-FHV (2.2L, 16V, turbo diesel, 170 hp from 2005)',
            'C': '2C, 2CT, 2CT-E (2.0L, 8V, diesel)',
            'E': '2AZ-FE (2.4L, 16V, gasoline)',
            'F': '1MZ-FE (3.0L V6, 24V, gasoline)',
            'J': '1AZ-FSE (2.0L, 16V, gasoline, 147 hp) D4 family',
            'P': '2AZ-FSE (2.4L, 16V, gasoline, 163 hp) D4 family',
            'R': '1ZZ-FE (1.8L, 16V, gasoline, 129 hp) EFI family',
            'S': '3S-FE (2.0L, 16V, gasoline)',
            'T': '2UZ-FE (4.7L, V8, 32V, gasoline)',
            'W': '1CD-FTV (2.0L, 16V, turbo diesel, 116 hp)',
            'Z': '1ZZ-FE, 3ZZ-FE (1.8L, 16V, gasoline, 110 hp) EFI family'
        },

        // 6th character - Series number
        seriesNumber: {
            '0': 'Toyota Land Cruiser J100/J105',
            '2': 'Toyota Land Cruiser Prado J120'
        },

        // 7th character - Safety systems
        safetySystems: {
            '0': '2 front airbags and side curtains',
            '1': 'No airbags',
            '2': '1 driver airbag',
            '3': '2 front airbags',
            '6': '2 front airbags, side airbags, side curtains, driver knee airbag',
            '7': '2 front airbags, driver knee airbag',
            '8': '2 front airbags, side airbags'
        },

        // 8th character - Model
        model: {
            '3': 'Yaris Verso',
            '4': 'Yaris',
            'B': 'Avensis Verso',
            'C': 'Aygo',
            'E': 'Auris / Corolla',
            'G': 'HiLux / Fortuner (Asian market)',
            'J': 'Land Cruiser / Land Cruiser Prado',
            'K': 'Camry',
            'L': 'Avensis',
            'M': 'Previa',
            'R': 'Corolla Verso',
            'T': 'Celica',
            'V': 'RAV-4'
        }
    },

    // North American market before 1996
    northAmericanPre1996: {
        // 4th character - Engine
        engine: {
            '4': '7A-FE Lean Burn',
            'A': '3MZ-FE',
            'B': '1NZ-FXE, 2AZ-FXE',
            'D': '2AZ-FE',
            'E': '2AZ-FE',
            'F': '1MZ-FE',
            'G': '5S-FE',
            'H': '1AZ-FE',
            'K': '2GR-FE',
            'L': '2RZ-FE',
            'M': '3RZ-FE',
            'N': '5VZ-FE',
            'P': '3S-FE',
            'R': '1ZZ-FE',
            'S': '1BM',
            'T': '2UZ-FE, 1NZ-FE, 3S-GTE',
            'U': '1GR-FE',
            'Y': '2ZZ-GE'
        },

        // 5th character - Model/Platform
        platform: {
            '0': 'MR2 Spyder',
            'A': 'Celica RWD [Supra]',
            'C': 'Previa, Sienna',
            'D': 'T100',
            'E': 'Corolla',
            'J': 'Land Cruiser',
            'K': 'Camry',
            'L': 'Tercel, Pacio',
            'N': 'Medium trucks',
            'R': '4Runner',
            'T': 'Celica FWD',
            'V': 'RAV-4, Fun Cruiser',
            'W': 'MR2',
            'X': 'Cressida'
        },

        // 7th character - Model line
        modelLine: {
            '0': 'Avalon',
            'A': 'Supra',
            'B': 'Carina/Avensis',
            'C': 'Previa, Fun Cruiser (RAV4)',
            'D': 'Mega Cruiser',
            'E': 'Corolla',
            'F': 'Lexus LS400',
            'J': 'Land Cruiser',
            'H': 'Hi Ace',
            'K': 'Hi Ace',
            'L': 'Paceo, Tercel',
            'M': 'Picnic',
            'N': 'HiLux',
            'P': 'Starlet',
            'R': 'LitAce',
            'S': 'Lexus GS300, Crown',
            'T': 'Carina, Corona, Celica, Avensis',
            'U': 'Dyna 200',
            'V': 'Camry',
            'W': 'MR2',
            'X': 'Cressida',
            'Y': 'Dyna 100, Dyna 150'
        },

        // 8th character - Body type
        bodyType: {
            'C': 'Coupe',
            'D': 'Sedan, 2 doors',
            'E': 'Sedan, 4 doors',
            'G': 'Hatchback, 3 doors',
            'H': 'Hatchback, 5 doors',
            'J': 'Coupe with Targa roof',
            'K': 'Incomplete chassis',
            'L': 'Liftback, 3 doors',
            'M': 'Liftback, 5 doors',
            'S': 'Coupe',
            'V': 'Station wagon',
            'W': 'Station wagon',
            'Z': 'Hatchback'
        }
    },

    // North American market since 1996
    northAmericanPost1996: {
        // 4th character - Body type and wheel formula
        bodyType: {
            'A': 'Sedan, 2 doors, 4x2',
            'B': 'Sedan, 4 doors, 4x2',
            'C': 'Coupe, 2 doors, 4x2',
            'D': 'Hatchback/Liftback, 3 doors, 4x2',
            'F': 'Convertible, 2 doors, 4x2',
            'G': 'Station wagon, 4 doors, 4x2',
            'H': 'Station wagon, 4 doors, 4x4',
            'J': 'Pickup, 4 doors, 4x2',
            'K': 'Station wagon, 5 doors, 4x2',
            'L': 'Station wagon, 5 doors, 4x4',
            'M': 'Family station wagon (VAN), 5 doors, 4x2',
            'P': 'Pickup, 2 doors (regular cab), 4x4',
            'S': 'Hatchback/Liftback, 3 doors, 4x4',
            'T': 'Pickup, 2 doors (extended cab), 4x2',
            'Z': 'Station wagon, 5 doors, 4x2'
        },

        // 5th character - Engine
        engine: {
            'A': '4A-FE, 7A-FE (1.6L, 16V, gasoline)',
            'C': '2C, 2CT, 2CT-E (2.0L, 8V, diesel)',
            'F': '1MZ-FE (3.0L V6, 24V, gasoline)',
            'S': '3S-FE (2.0L, 16V, gasoline)',
            'T': '2UZ-FE (4.7L, V8, 32V, gasoline)',
            'Z': '1ZZ-FE, 3ZZ-FE (1.8L, 16V, gasoline)'
        },

        // 6th character - Series number
        seriesNumber: {
            '0': 'Toyota Land Cruiser J100/J105',
            '2': 'Toyota Land Cruiser Prado J120'
        },

        // 7th character - Safety systems
        safetySystems: {
            '0': '2 front airbags and side curtains',
            '1': 'No airbags',
            '2': '1 driver airbag',
            '3': '2 front airbags',
            '6': '2 front airbags, side airbags, side curtains, driver knee airbag',
            '7': '2 front airbags, driver knee airbag',
            '8': '2 front airbags, side airbags'
        },

        // 8th character - Model
        model: {
            '1': 'Tundra',
            '3': 'Echo / Yaris Verso',
            '4': 'Yaris',
            '6': 'HiLux',
            'A': 'Highlander / Sequoia',
            'B': 'Avalon',
            'C': 'Sienna',
            'E': 'Corolla / Matrix',
            'F': 'FJ Cruiser',
            'G': 'HiLux / Fortuner (Asian market)',
            'J': 'Land Cruiser / Land Cruiser Prado',
            'K': 'Camry / Aurion (TRD)',
            'L': 'Tercel / Paceo',
            'M': 'Previa',
            'N': 'Tacoma',
            'P': 'Camry Solara',
            'R': '4Runner / Corolla Verso',
            'T': 'Celica',
            'U': 'Prius',
            'V': 'RAV-4'
        }
    },

    // Assembly plants (11th character)
    assemblyPlants: {
        '0': 'Japan',
        '1': 'Japan',
        '2': 'Japan',
        '3': 'Japan',
        '4': 'Japan',
        '5': 'Japan',
        '6': 'Japan',
        '7': 'Japan',
        '8': 'Japan',
        '9': 'Japan',
        'C': 'Cambridge, Canada',
        'M': 'Baja, California, USA',
        'S': 'Princeton, IN, USA',
        'U': 'Georgetown, KY, USA',
        'X': 'San Antonio, TX, USA',
        'Z': 'Fremont, CA, USA (NUMMI plant)'
    },

    // Main decoding function
    decodeVIN: function(vin) {
        if (!vin || vin.length < 11) {
            return { error: 'VIN must be at least 11 characters long' };
        }

        const result = {
            isToyota: false,
            market: 'unknown',
            era: 'unknown',
            details: {}
        };

        // Check if it's a Toyota VIN
        const wmi = vin.substring(0, 3);
        const toyotaWMIs = [
            'JT1', 'JT2', 'JT3', 'JT4', 'JT5', 'JT6', 'JT7', 'JT8', 'JTA', 'JTB', 'JTC', 'JTD', 'JTE', 'JTF', 'JTG', 'JTJ', 'JTK', 'JTL', 'JTM', 'JTN',
            'SB1', '1NX', '2T1', '2T3', '3TM', '4T1', '4T2', '4T3', '4T4', '4TA', '5TB', '5TD', '5TE', '5TF', '5YF', '6T1', '8AJ', '9BR', 'ACU', 'AHH',
            'AHT', 'VNK', 'XW7', 'MR0', 'MR1', 'MR2', 'MHF', 'MHK', 'MBJ', 'LFM', 'LFP', 'LVG', 'PN1', 'PN2', 'RKL'
        ];

        // Check if WMI starts with any Toyota prefix
        const isToyota = toyotaWMIs.some(prefix => wmi.startsWith(prefix));
        
        if (isToyota) {
            result.isToyota = true;
            
            // Determine market and era
            if (wmi.startsWith('JT') || wmi.startsWith('SB1')) {
                // European market
                result.market = 'european';
                
                // Check if pre or post 2002 based on VIN pattern
                if (vin.length >= 9 && vin[8] === '0' && vin.substring(6, 8).match(/[A-Z]{2}/)) {
                    result.era = 'pre2002';
                } else {
                    result.era = 'post2002';
                }
            } else if (wmi.startsWith('1N') || wmi.startsWith('2T') || wmi.startsWith('3T') || wmi.startsWith('4T') || wmi.startsWith('5T')) {
                // North American market
                result.market = 'north_american';
                
                // Simple era determination based on VIN length and pattern
                if (vin.length === 17 && vin[6] && vin[6].match(/[A-Z]/)) {
                    result.era = 'post1996';
                } else {
                    result.era = 'pre1996';
                }
            }

            // Get assembly plant (11th character)
            const plantCode = vin[10];
            result.details.assemblyPlant = this.assemblyPlants[plantCode] || 'Unknown assembly plant';

            // Market-specific decoding
            if (result.market === 'european') {
                if (result.era === 'pre2002') {
                    // European pre-2002 decoding
                    const bodyTypeCode = vin.substring(3, 5);
                    result.details.bodyType = this.europeanPre2002.bodyType[bodyTypeCode] || 'Unknown body type';
                    
                    const engineCode = vin[5];
                    result.details.engine = this.europeanPre2002.engine[engineCode] || 'Unknown engine';
                    
                    const modelLineCode = vin[6];
                    result.details.modelLine = this.europeanPre2002.modelLine[modelLineCode] || 'Unknown model line';
                    
                    const modelCode = vin.substring(7, 9);
                    result.details.model = this.europeanPre2002.modelCodes[modelCode] || 'Unknown model';
                    
                } else if (result.era === 'post2002') {
                    // European post-2002 decoding
                    const bodyTypeCode = vin[3];
                    result.details.bodyType = this.europeanPost2002.bodyType[bodyTypeCode] || 'Unknown body type';
                    
                    const engineCode = vin[4];
                    result.details.engine = this.europeanPost2002.engine[engineCode] || 'Unknown engine';
                    
                    const seriesCode = vin[5];
                    result.details.series = this.europeanPost2002.seriesNumber[seriesCode] || 'Unknown series';
                    
                    const safetyCode = vin[6];
                    result.details.safetySystems = this.europeanPost2002.safetySystems[safetyCode] || 'Unknown safety systems';
                    
                    const modelCode = vin[7];
                    result.details.model = this.europeanPost2002.model[modelCode] || 'Unknown model';
                }
            } else if (result.market === 'north_american') {
                if (result.era === 'pre1996') {
                    // North American pre-1996 decoding
                    const engineCode = vin[3];
                    result.details.engine = this.northAmericanPre1996.engine[engineCode] || 'Unknown engine';
                    
                    const platformCode = vin[4];
                    result.details.platform = this.northAmericanPre1996.platform[platformCode] || 'Unknown platform';
                    
                    const modelLineCode = vin[6];
                    result.details.modelLine = this.northAmericanPre1996.modelLine[modelLineCode] || 'Unknown model line';
                    
                    const bodyTypeCode = vin[7];
                    result.details.bodyType = this.northAmericanPre1996.bodyType[bodyTypeCode] || 'Unknown body type';
                    
                } else if (result.era === 'post1996') {
                    // North American post-1996 decoding
                    const bodyTypeCode = vin[3];
                    result.details.bodyType = this.northAmericanPost1996.bodyType[bodyTypeCode] || 'Unknown body type';
                    
                    const engineCode = vin[4];
                    result.details.engine = this.northAmericanPost1996.engine[engineCode] || 'Unknown engine';
                    
                    const seriesCode = vin[5];
                    result.details.series = this.northAmericanPost1996.seriesNumber[seriesCode] || 'Unknown series';
                    
                    const safetyCode = vin[6];
                    result.details.safetySystems = this.northAmericanPost1996.safetySystems[safetyCode] || 'Unknown safety systems';
                    
                    const modelCode = vin[7];
                    result.details.model = this.northAmericanPost1996.model[modelCode] || 'Unknown model';
                }
            }

            // Get year from 10th character
            const yearCode = vin[9];
            const years = vinYearMap[yearCode];
            if (years) {
                result.details.productionYear = years.join(' or ');
            }
        }

        return result;
    }
};
