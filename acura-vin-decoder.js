// acura-vin-decoder.js
// Acura VIN decoder for integration with the existing VIN lookup site

const acuraVinDecoder = {
    decodeVIN: function(vin) {
        if (vin.length !== 17) {
            return { isAcura: false };
        }
        
        const wmi = vin.substring(0, 3);
        if (!['19U', '19V', '2HH', '2HN', '2HU', '5FR', '5FS', '5J0', '5J8', '5KC', 'JAE', 'JH4'].includes(wmi)) {
            return { isAcura: false };
        }
        
        // Decode Acura VIN
        const details = this.decodeAcuraVIN(vin);
        
        return {
            isAcura: true,
            details: details
        };
    },
    
    decodeAcuraVIN: function(vin) {
        const details = {};
        
        // Position 1-3: WMI (already known)
        details.Manufacturer = "Acura (Honda Motor Company)";
        
        // Position 4-6: Body Series and Engine Type
        const bodySeries = vin.substring(3, 6);
        details.BodySeries = this.decodeBodySeries(bodySeries);
        
        // Position 7: Body Type and Transmission
        details.BodyTransmission = this.decodeBodyTransmission(vin[6]);
        
        // Position 8: Engine Code (not decoded in detail)
        details.EngineCode = vin[7];
        
        // Position 9: Check Digit (not decoded)
        
        // Position 10: Model Year
        details.ModelYear = this.decodeYear(vin[9]);
        
        // Position 11: Assembly Plant
        details.AssemblyPlant = this.decodeAssemblyPlant(vin[10]);
        
        // Position 12-17: Sequential Number
        details.SequentialNumber = vin.substring(11, 17);
        
        return details;
    },
    
    decodeBodySeries: function(code) {
        const bodySeriesMap = {
            'CC2': 'Vigor (2.5L)',
            'CU2': 'TSX (2008+) (2.4L)',
            'CU4': 'TSX V6 Tech',
            'CW2': 'TSX Wagon',
            'DA9': 'Integra (1.8L)',
            'DB1': 'Integra',
            'DB2': 'Integra GS-R',
            'DB7': 'Integra',
            'DB8': 'Integra GS-R',
            'DC2': 'Integra Coupe',
            'DC4': 'Integra Coupe',
            'DE1': 'ILX20',
            'DE2': 'ILX24',
            'DE3': 'ILX',
            'DJ5': 'SLX',
            'DC5': 'RSX (2.0L)',
            'KA7': 'Legend V6 3.2 4D',
            'KA8': 'Legend V6 3.2 2D',
            'KA9': 'RL I (3.5L) (1999-2004)',
            'KB1': 'RL II (3.5L) (2004+)',
            'KC1': 'RLX',
            'KC2': 'RLX Hybrid (AWD)',
            'NA1': 'NSX 3.0',
            'NA2': 'NSX 3.2',
            'TB1': 'RDX (2.3L)',
            'TB3': 'RDX II',
            'TB4': 'RDX AWD II',
            'UA2': 'TL I (1998-2003) (2.3/2.5L)',
            'UA3': 'TL I (1998-2003) (3.2L)',
            'UA5': 'TL I (1998-2003) (3.2L)',
            'UA6': 'TL II (2003+) (3.2L)',
            'UA7': 'TL II (2003+) (3.5L)',
            'UA8': 'TL III',
            'UA9': 'TL Sh-AWD III',
            'UB1': 'TLX',
            'UB2': 'TLX V6',
            'UB3': 'TLX SH-AWD V6',
            'YA1': 'CL (1998-2002) (2.2L)',
            'YA2': 'CL (1998-2002) (3.0L)',
            'YA3': 'CL (1998-2002) (2.3L)',
            'YA4': 'CL (1998-2002) (3.2L)',
            'YB1': 'ZDX (2009+) (3.7L)',
            'YD1': 'MDX (3.5L)',
            'YD2': 'MDX (3.7L)',
            'YD3': 'MDX II',
            'YD4': 'MDX SH-AWD II'
        };
        
        return bodySeriesMap[code] || 'Unknown Model';
    },
    
    decodeBodyTransmission: function(code) {
        const transmissionMap = {
            '1': '2 Door Coupe, Manual',
            '2': '2 Door Coupe, Automatic',
            '3': 'Hatchback, Manual',
            '4': 'Hatchback, Automatic',
            '5': '4 Door Sedan, Manual',
            '6': '4 Door Sedan, Automatic',
            '7': '5 Door Wagon, Manual',
            '8': '5 Door Wagon, Automatic'
        };
        
        return transmissionMap[code] || 'Unknown Body/Transmission';
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
            'A': 'Marysville, Ohio, USA',
            'C': 'Saitama Factory (Sayama), Japan',
            'D': 'Malaysia',
            'F': 'Taiwan',
            'H': 'Ontario, Canada',
            'K': 'Karawang, Indonesia',
            'L': 'East Liberty, Ohio Factory, USA',
            'P': 'Royana Factory in Thailand Ayuthaya',
            'R': 'Pakistan',
            'S': 'Suzuka, Japan',
            'T': 'Tochigi, Japan',
            'U': 'Honda of the U.K. Manufacturing, Great Britain',
            'V': 'Phillipines',
            'W': 'Turkey',
            'Z': 'Sao Paulo Factory, Brasilia'
        };
        
        return plantMap[code] || 'Unknown Plant';
    }
};