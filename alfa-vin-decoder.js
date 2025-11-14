// alfa-vin-decoder.js
// Alfa Romeo VIN decoder for integration with the existing VIN lookup site

const alfaVinDecoder = {
    decodeVIN: function(vin) {
        if (vin.length !== 17) {
            return { isAlfaRomeo: false };
        }
        
        const wmi = vin.substring(0, 3);
        if (wmi !== 'ZAR') {
            return { isAlfaRomeo: false };
        }
        
        // Decode Alfa Romeo VIN
        const details = this.decodeAlfaVIN(vin);
        
        return {
            isAlfaRomeo: true,
            details: details
        };
    },
    
    decodeAlfaVIN: function(vin) {
        const details = {};
        
        // Position 1-3: WMI (already known)
        details.Manufacturer = "Alfa Romeo";
        details.Market = this.determineMarket(vin);
        
        // Determine VIN type based on market and year
        if (details.Market === "European") {
            this.decodeEuropeanVIN(vin, details);
        } else if (details.Market === "American Pre-2013") {
            this.decodeAmericanPre2013VIN(vin, details);
        } else if (details.Market === "American Post-2013") {
            this.decodeAmericanPost2013VIN(vin, details);
        }
        
        // Position 10: Model Year (common for all)
        details.ModelYear = this.decodeYear(vin[9]);
        
        return details;
    },
    
    determineMarket: function(vin) {
        // Check if it's American market post-2013 (4C model)
        if (vin[3] === 'A' && vin[4] === 'A' && vin[5] === 'A') {
            return "American Post-2013";
        }
        // Check if it's American market pre-2013
        else if (vin[3] >= 'A' && vin[3] <= 'Z' && vin[4] >= 'A' && vin[4] <= 'Z') {
            return "American Pre-2013";
        }
        // Otherwise European market
        else {
            return "European";
        }
    },
    
    decodeEuropeanVIN: function(vin, details) {
        // Position 4-6: Model Code
        const modelCode = vin.substring(3, 6);
        details.Model = this.decodeEuropeanModel(modelCode);
        
        // Position 7: Engine and Equipment (limited info available)
        details.EngineInfo = "Standard European specification";
        
        // Position 11: Assembly Plant
        details.AssemblyPlant = this.decodeAssemblyPlant(vin[10]);
        
        // Position 12-17: Sequential Number
        details.SequentialNumber = vin.substring(11, 17);
    },
    
    decodeAmericanPre2013VIN: function(vin, details) {
        // Position 4: Model
        details.Model = this.decodeAmericanPre2013Model(vin[3]);
        
        // Position 5: Transmission and Generation
        details.TransmissionGeneration = this.decodeAmericanPre2013Transmission(vin[4], vin[3]);
        
        // Position 6: Body Type
        details.BodyType = this.decodeAmericanPre2013BodyType(vin[5], vin[3]);
        
        // Position 7: Engine and Equipment
        details.EngineEquipment = this.decodeAmericanPre2013Engine(vin[6]);
        
        // Position 8: Trim Level
        details.TrimLevel = this.decodeAmericanPre2013Trim(vin[7], vin[3]);
        
        // Position 11: Assembly Plant
        details.AssemblyPlant = this.decodeAssemblyPlant(vin[10]);
        
        // Position 12-17: Sequential Number
        details.SequentialNumber = vin.substring(11, 17);
    },
    
    decodeAmericanPost2013VIN: function(vin, details) {
        // Position 4: Safety Systems
        details.SafetySystems = this.decodeAmericanPost2013Safety(vin[3]);
        
        // Position 5: Brand Code
        details.Brand = "Alfa Romeo";
        
        // Position 6: Model
        details.Model = this.decodeAmericanPost2013Model(vin[5]);
        
        // Position 7: Body Type and Trim
        details.BodyTrim = this.decodeAmericanPost2013BodyTrim(vin[6]);
        
        // Position 8: Engine
        details.Engine = this.decodeAmericanPost2013Engine(vin[7]);
        
        // Position 11: Assembly Plant
        details.AssemblyPlant = this.decodeAssemblyPlant(vin[10]);
        
        // Position 12-17: Sequential Number
        details.SequentialNumber = vin.substring(11, 17);
    },
    
    decodeEuropeanModel: function(code) {
        const modelMap = {
            '115': 'Spider (1981-1993)',
            '116': 'Alfetta / Alfetta GT / Alfetta GTV (1972-1987)',
            '119': 'Alfa 6 (1979-1986)',
            '162': '75 / 90 (1984-1992)',
            '164': '164 (1987-1998)',
            '167': '155 (1992-1998)',
            '168': '164 Super (1992-1997)',
            '901': 'AlfaSud (1971-1989)',
            '902': 'AlfaSud (1971-1989)',
            '904': 'AlfaSud (1971-1989)',
            '905': '33 (1983-1990)',
            '907': '33 II gen (1990-1994)',
            '916': 'GTV / Spider (1995-2006)',
            '920': 'Arna (1983-1986) - Nissan Pulsar with Alfa Romeo powertrain',
            '930': '145/146 (1994-2000)',
            '932': '156 (1997-2005)',
            '936': '166 (1998-2007)',
            '937': '147 (2000-2010) / GT (2003-2010)',
            '939': '159 (2005-2008) / Brera (2005-2008) / Spider (2005-2008)',
            '940': 'Giulietta (2010+)',
            '952': 'Giulia (2015+)',
            '955': 'MiTo (2008+)',
            '960': '4C (2013+)'
        };
        
        return modelMap[code] || `Unknown Model (Code: ${code})`;
    },
    
    decodeAmericanPre2013Model: function(code) {
        const modelMap = {
            'A': 'GTV 6 2.5 (European Alfetta GTV with V6 engine)',
            'B': '2000 Spider Veloce (European Spider 3rd version)',
            'D': 'Milano (European 75)',
            'E': '164',
            'J': '8C Competizione'
        };
        
        return modelMap[code] || `Unknown Model (Code: ${code})`;
    },
    
    decodeAmericanPre2013Transmission: function(code, modelCode) {
        if (modelCode === 'E' || modelCode === 'J') {
            // For 164 and 8C Competizione
            const generationMap = {
                'A': '1st Generation (164, 8C Competizione)',
                'D': '4th Generation (Spider)'
            };
            return generationMap[code] || `Unknown Generation (Code: ${code})`;
        } else {
            // For older models
            const transmissionMap = {
                'A': '5-speed Manual (GTV 6 2.5, 2000 Spider Veloce, Milano)',
                'B': '3-speed Automatic (Spider, Milano)',
                'C': '5-speed Manual (Spider, Milano)'
            };
            return transmissionMap[code] || `Unknown Transmission (Code: ${code})`;
        }
    },
    
    decodeAmericanPre2013BodyType: function(code, modelCode) {
        if (modelCode === 'E') {
            // For ALFA ROMEO 164 - transmission type
            const transmissionMap = {
                '3': 'Manual Transmission',
                '4': 'Automatic Transmission'
            };
            return transmissionMap[code] || `Unknown Transmission (Code: ${code})`;
        } else {
            // Body types for other models
            const bodyMap = {
                '1': 'Sedan (Milano) / Coupe (8C Competizione)',
                '2': 'Roadster (8C Competizione Spider)',
                '5': 'Spider (2000 Spider Veloce)',
                '6': '2-Door Coupe (GTV 6 2.5)'
            };
            return bodyMap[code] || `Unknown Body Type (Code: ${code})`;
        }
    },
    
    decodeAmericanPre2013Engine: function(code) {
        const engineMap = {
            '1': 'Quad Silver/Gold 2.5 (Milano)',
            '2': 'Quad Green 3.0 (Milano)',
            '3': 'Quad Platinum/Silver 2.5 (Milano) / 3.0 (164)',
            '4': 'R4 2.0 (2000 Spider Veloce) / Quad Gold/Platinum 2.5 (Milano)',
            '5': 'Quadrifoglio/Veloce 2.0 (Spider)',
            '6': 'V6 2.5 (GTV 6 2.5)',
            '8': 'V8 4.7L 450 HP (8C Competizione)'
        };
        
        return engineMap[code] || `Unknown Engine (Code: ${code})`;
    },
    
    decodeAmericanPre2013Trim: function(code, modelCode) {
        if (modelCode === 'J') {
            // For 8C Competizione - safety systems
            return 'Inertial seat belts, front airbags for driver and passenger';
        } else {
            // Trim levels for other models
            const trimMap = {
                '0': 'Milano Quad Gold 2.5',
                '1': '2000 Spider Veloce',
                '2': 'Milano Quad Platinum 2.5',
                '4': 'Milano Quad Silver 2.5 / Green 3.0, Spider Graduate 2.0',
                '6': 'Milano Quad Gold/Platinum',
                '9': 'GTV 6 2.5',
                'A': 'ALFA ROMEO 164 BASE',
                'E': 'ALFA ROMEO 164S',
                'R': 'ALFA ROMEO 164FL'
            };
            return trimMap[code] || `Unknown Trim (Code: ${code})`;
        }
    },
    
    decodeAmericanPost2013Safety: function(code) {
        const safetyMap = {
            'A': 'Seat belts with pretensioners, front airbags',
            'B': 'Seat belts with pretensioners, front airbags, side airbags for first row',
            'C': 'Seat belts with pretensioners, front airbags, side airbags for all rows',
            'D': 'Seat belts with pretensioners, no airbags'
        };
        
        return safetyMap[code] || `Unknown Safety System (Code: ${code})`;
    },
    
    decodeAmericanPost2013Model: function(code) {
        const modelMap = {
            'A': '4C'
        };
        
        return modelMap[code] || `Unknown Model (Code: ${code})`;
    },
    
    decodeAmericanPost2013BodyTrim: function(code) {
        const bodyTrimMap = {
            'A': '4C Coupe',
            'B': '4C Spider',
            'C': '4C Coupe LAUNCH EDITION',
            'D': '4C Spider LAUNCH EDITION'
        };
        
        return bodyTrimMap[code] || `Unknown Body/Trim (Code: ${code})`;
    },
    
    decodeAmericanPost2013Engine: function(code) {
        const engineMap = {
            '4': 'R4, 1.75L, 214HP'
        };
        
        return engineMap[code] || `Unknown Engine (Code: ${code})`;
    },
    
    decodeAssemblyPlant: function(code) {
        const plantMap = {
            '0': 'Maserati (8C Competizione Spider)',
            '1': 'Arese',
            '2': 'Naples',
            '5': 'Maserati (8C Competizione Coupe)',
            '6': 'Arese (ALFA ROMEO 164)',
            'M': 'Maserati (Modena, Italy)'
        };
        
        return plantMap[code] || `Unknown Plant (Code: ${code})`;
    },
    
    decodeYear: function(code) {
        const yearMap = {
            '6': '2006', '7': '2007', '8': '2008', '9': '2009',
            'A': '2010', 'B': '2011', 'C': '2012', 'D': '2013',
            'E': '2014', 'F': '2015', 'G': '2016', 'H': '2017',
            'J': '2018', 'K': '2019', 'L': '2020', 'M': '2021',
            'N': '2022', 'P': '2023', 'R': '2024', 'S': '2025',
            'T': '2026', 'V': '2027', 'W': '2028', 'X': '2029',
            'Y': '2030'
        };
        
        return yearMap[code] || 'Unknown Year';
    }
};