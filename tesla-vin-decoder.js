// tesla-vin-decoder-integrated.js
// Simplified Tesla VIN decoder for integration with the existing VIN lookup site

const teslaVinDecoder = {
    decodeVIN: function(vin) {
        if (vin.length !== 17) {
            return { isTesla: false };
        }
        
        const wmi = vin.substring(0, 3);
        if (!['5YJ', '7G2', 'SFZ', 'LRW', '7SA', 'XP7'].includes(wmi)) {
            return { isTesla: false };
        }
        
        // Decode Tesla VIN
        const details = this.decodeTeslaVIN(vin);
        
        return {
            isTesla: true,
            details: details
        };
    },
    
    decodeTeslaVIN: function(vin) {
        const details = {};
        
        // Position 1-3: WMI (already known)
        details.Manufacturer = this.decodeWMI(vin.substring(0, 3));
        
        // Position 4: Vehicle Type
        details.Model = this.decodeModel(vin[3]);
        
        // Position 5: Body Type
        details.BodyType = this.decodeBodyType(vin[4], vin[3]);
        
        // Position 6: Restraint System / GVWR
        if (vin[3] === 'R') {
            details.Region = this.decodeRoadsterRegion(vin[5]);
        } else if (vin[3] === 'C' || vin[3] === 'T') {
            details.GVWR = this.decodeGVWR(vin[5]);
        } else {
            details.RestraintSystem = this.decodeRestraintSystem(vin[5]);
        }
        
        // Position 7: Battery Type / Charger Type
        if (vin[3] === 'R') {
            details.RestraintSystem = this.decodeRoadsterRestraint(vin[6]);
        } else {
            details.BatteryType = this.decodeBatteryType(vin[6]);
        }
        
        // Position 8: Motor/Drive Unit
        if (vin[3] === 'R') {
            details.Motor = this.decodeRoadsterMotor(vin[7]);
        } else if (vin[3] === 'C' || vin[3] === 'T') {
            details.Motor = this.decodeTruckMotor(vin[7]);
        } else {
            details.Motor = this.decodeMotor(vin[7]);
        }
        
        // Position 9: Check Digit (not decoded)
        
        // Position 10: Model Year
        details.ModelYear = this.decodeYear(vin[9]);
        
        // Position 11: Assembly Plant
        details.AssemblyPlant = this.decodeAssemblyPlant(vin[10]);
        
        // Position 12: Serial Number / Build Phase
        details.SerialNumber = this.decodeSerialNumber(vin[11]);
        
        // Position 13-17: Sequential Number
        details.SequentialNumber = vin.substring(12, 17);
        
        return details;
    },
    
    decodeWMI: function(wmi) {
        const wmiMap = {
            '5YJ': 'Tesla, Inc. (USA)',
            '7G2': 'Tesla, Inc. (Truck)',
            'SFZ': 'Tesla Motors (Roadster UK)',
            'LRW': 'Tesla, China',
            '7SA': 'Tesla, MPV (Model X/Y)',
            'XP7': 'Tesla, Berlin'
        };
        
        return wmiMap[wmi] || 'Tesla, Unknown Plant';
    },
    
    decodeModel: function(code) {
        const modelMap = {
            'C': 'Cybertruck',
            'R': 'Roadster',
            'S': 'Model S',
            'T': 'Tesla Semi',
            'X': 'Model X',
            'Y': 'Model Y',
            '3': 'Model 3'
        };
        
        return modelMap[code] || 'Unknown Model';
    },
    
    decodeBodyType: function(code, model) {
        if (model === 'R') {
            return 'Convertible';
        } else if (model === 'X') {
            if (code === 'C') return 'MPV, 5 Door (LHD)';
            if (code === 'D') return 'MPV, 5 Door (RHD)';
        } else if (model === 'Y') {
            if (code === 'G') return 'MPV, 5 Door (LHD)';
            if (code === 'H') return 'MPV, 5 Door (RHD)';
        } else if (model === '3') {
            if (code === 'E') return 'Sedan 4 Door (LHD)';
            if (code === 'F') return 'Sedan 4 Door (RHD)';
        } else if (model === 'S') {
            if (code === 'E') return 'Sedan 4 Door (LHD)';
        }
        
        return 'Unknown Body Type';
    },
    
    decodeRoadsterRegion: function(code) {
        const regionMap = {
            '1': 'USA (LHD)',
            '2': 'Europe (LHD)',
            '3': 'Europe (RHD)',
            '6': 'Canada (LHD)',
            '8': 'Hong Kong (RHD)'
        };
        
        return regionMap[code] || 'Unknown Region';
    },
    
    decodeGVWR: function(code) {
        const gvwrMap = {
            'E': 'Class 8 (>33,001 lbs)',
            'G': 'Class G (8,001-9,000 lbs)',
            'H': 'Class H (9,001-10,000 lbs)'
        };
        
        return gvwrMap[code] || 'Unknown GVWR';
    },
    
    decodeRestraintSystem: function(code) {
        // Simplified restraint system decoding
        if (code === '1' || code === 'A') return 'Manual Type 2 Seat Belts with Airbags';
        if (code === '2' || code === 'B') return 'Manual Type 2 Seat Belts (Non-USA)';
        return 'Standard Restraint System';
    },
    
    decodeRoadsterRestraint: function(code) {
        if (code === '1' || code === 'A') return 'Type 2 USA Seat Belts, Dual Airbags';
        if (code === 'B') return 'Non-USA Restraint System';
        return 'Standard Restraint System';
    },
    
    decodeBatteryType: function(code) {
        const batteryMap = {
            'A': '10kw Charger',
            'B': '20kw Charger',
            'C': '10kw Charger with DC Fast Charge',
            'D': '20kw Charger with DC Fast Charge',
            'E': 'Lithium-Ion Battery',
            'F': 'Lithium Iron Phosphate Battery',
            'H': 'Lithium-Ion Battery - High Capacity',
            'S': 'Lithium-Ion Battery - Standard Capacity',
            'V': 'Lithium-Ion Battery - Ultra High Capacity'
        };
        
        return batteryMap[code] || 'Standard Battery';
    },
    
    decodeRoadsterMotor: function(code) {
        const motorMap = {
            '1': 'Tesla M6B Motor',
            '3': 'Tesla M6S Motor',
            'B': 'Tesla 56C Motor'
        };
        
        return motorMap[code] || 'Standard Motor';
    },
    
    decodeTruckMotor: function(code) {
        const motorMap = {
            'B': 'Dual Drive Rear Axle, Air Brakes (Semi)',
            'D': 'Dual Motor - Standard (Cybertruck)',
            'E': 'Triple Motor - Performance (Cybertruck)'
        };
        
        return motorMap[code] || 'Standard Truck Motor';
    },
    
    decodeMotor: function(code) {
        // Simplified motor decoding
        if (code === '1') return 'Single Motor - Three Phase A/C Induction';
        if (code === '2') return 'Dual Motor - Three Phase A/C Induction';
        if (code === '3') return 'Performance Single Motor';
        if (code === '4') return 'Performance Dual Motor';
        if (code === 'A') return 'Single Motor - Standard Model 3';
        if (code === 'B') return 'Dual Motor - Standard Model 3';
        if (code === 'C') return 'Dual Motor - Performance Model 3';
        if (code === 'D') return 'Single Motor - Model Y';
        if (code === 'E') return 'Dual Motor - Standard Model Y';
        if (code === 'F') return 'Dual Motor - Performance Model Y';
        
        return 'Standard Motor';
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
    },
    
    decodeAssemblyPlant: function(code) {
        const plantMap = {
            '1': 'Menlo Park, CA, USA',
            '3': 'Hethel, UK',
            'A': 'Austin, Texas, USA',
            'B': 'Berlin, Germany',
            'C': 'Shanghai, China',
            'F': 'Fremont, CA, USA',
            'G': 'Berlin, Germany',
            'N': 'Reno, NV, USA',
            'P': 'Palo Alto, CA, USA',
            'R': 'Research'
        };
        
        return plantMap[code] || 'Unknown Plant';
    },
    
    decodeSerialNumber: function(code) {
        if (code >= '0' && code <= '9') {
            return `Serial #, 100,000s digit: ${code}`;
        }
        
        const phaseMap = {
            'A': 'Alpha Prototype',
            'B': 'Beta Prototype',
            'E': 'Evaluation Prototype',
            'F': 'Founder Series Vehicle',
            'M': 'Mule Prototype',
            'P': 'Production Vehicle',
            'R': 'Release Candidate Vehicle',
            'S': 'Signature Series Vehicle',
            'V': 'Validation Prototype'
        };
        
        return phaseMap[code] || 'Production Vehicle';
    }
};
