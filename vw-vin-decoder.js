// Volkswagen VIN Decoder
const vwVinDecoder = {
    // 7th and 8th character - Model codes
    modelCodes: {
        '11': 'VW 1200 (Typ 111) / Tipo 1 (Typ 111, 113) [1983...1997] / Volkswagen Beetle',
        '12': 'up! (Typ 6A1, 6A5) [2014...]',
        '13': 'Scirocco (Typ 137) [2008...2012], Scirocco (Typ 138) [2015...]',
        '14': 'Caddy I (Typ 147, 148, 1AE) [1983...1992]',
        '15': 'Golf I Cabrio / Rabbit Convertible (Typ 154, 155) [1983...1992], Bora (Typ 152) [2009...], Jetta I (Typ 161, 162, 163, 164) [1983], Golf II (Typ 171,172, 173, 174) [1983], Scirocco (Typ 533, 534) [1983]',
        '16': 'Golf I Cabrio / Rabbit Convertible (Typ 154, 155) [1983...1984], Golf II (Typ 171, 172, 173, 174) [1983...1984], Golf II (Typ 191, 192, 193, 194) [1986], Golf Syncro (Typ 191, 192, 193, 194) [1988], Golf (Syncro) (Typ 1G1) [1987...1989], Rallye Golf Syncro (Typ 1G4) [1988], Jetta II (Typ 161, 162, 163, 164) [1983...1984], Jetta II (Typ 165, 166, 167, 168) [1986], Jetta / Vento (Typ 162) [2011...], Jetta (Typ 163) [2015...], Jetta Syncro / Golf GT Syncro (Typ 167, 168) [1988], Jetta (Syncro) (Typ 1G2) [1987...1989], Jetta (Typ AV2) [2013] / Jetta (Typ AY2, AY3) [2014...2015] / Jetta (Typ AV3) [2015], Scirocco (Typ 533, 534) [1983...1984], New Beetle (Typ 5C1) / New Beetle Cabriolet (5C7) [2013...2014]',
        '17': 'Golf I Cabrio / Rabbit Convertible (Typ 154, 155) [1984], Golf II / Rabbit (Typ 177, 178, 179) [1983...1989], Golf II (Typ 171, 172, 173, 174) [1984], Golf II (Typ 176) [1985...1986], Golf (Typ 174, 176) [2000...2009], Jetta II (Typ 161, 162, 163, 164) [1984], Jetta II (Typ 167) [1989], Rabbit (Typ 175) [1983...1984], Caddy (Typ 170) [2000...2007], Scirocco (Typ 533, 534) [1984]',
        '18': 'Iltis (Typ 183) [1986...1988], Lavida (Typ 181, 182, 183) [2008...2013]',
        '19': 'Jetta II (Typ 165, 166, 167, 168) [1984...1989], Golf II (Typ 191, 192, 193, 194) [1984...1988], Golf II (1983...1992), Jetta II (1984...1991), Golf (Syncro) (Typ 1G1) [1986...1989], Jetta (Syncro) (Typ 1G2) [1986...1989]',
        '1B': 'Tipo 1 (Typ 111, 113) [1998...2004] / Volkswagen Beetle',
        '1C': 'New Beetle (Typ 1C1, 1C9, 9C1, 9G1) [1998...2010]',
        '1E': 'Golf III Cabrio (1993...1998)',
        '1F': 'EOS (Typ 1F7, 1F8) [2006...2016]',
        '1G': 'Golf II, Jetta II',
        '1H': 'Golf III (1991...1997), Vento, Golf III Variant (1993...1999)',
        '1J': 'Golf IV (1997...2003), Bora, Golf IV Variant (1999...2007), Golf IV Cabrio (1998...)',
        '1K': 'Golf V (2003...2009), Golf [V] Plus (2004...), Golf V Variant (2007...2010)',
        '1L': 'XL-1 (2015)',
        '1T': 'Touran (2003...2016)',
        '1V': 'Golf Cabrio',
        '1W': 'Golf, Jetta, Vento',
        '1Y': 'New Beetle Convertible (2003...2010)',
        '21': 'LT',
        '24': 'Transporter (Platform truck)',
        '25': 'Transporter / Multivan / California T3 (Bus, Van, Kombi) (1980...1992)',
        '28': 'LT',
        '2A': 'Transporter Syncro',
        '2C': 'Caddy III (2010...2015)',
        '2D': 'LT (1996...2006)',
        '2E': 'Crafter',
        '2F': 'Crafter (2006...)',
        '2H': 'Amarok (2011...)',
        '2K': 'Caddy II (2004...2010)',
        '2V': 'L80',
        '31': 'Passat B3 (1988...1993)',
        '32': 'Passat B2 (1980...1988), Passat B1 (...1980)',
        '33': 'Passat B1 (...1980)',
        '35': 'Passat CC (2008...2013)',
        '36': 'Passat B7 (2010...2015)',
        '3A': 'Passat B4 1994...1996)',
        '3B': 'Passat B5 (1996...2005)',
        '3C': 'Passat B6 (2005...2010), Passat B7 (2010...2015), Passat B8 (2015...)',
        '3D': 'Phaeton (2002...2016)',
        '3G': 'Passat B8 (2015...)',
        '3H': 'Arteon [2017...]',
        '50': 'Corrado',
        '53': 'Scirocco',
        '5C': 'New Beetle II / Cabrio (2012...)',
        '5K': 'Golf VI (2009...2013)',
        '5M': 'Golf Plus (2009...2014)',
        '5N': 'Tiguan (2007...2016)',
        '5T': 'Touran II (2016...)',
        '5U': 'Gol (2008...)',
        '5Z': 'Fox (2004...), Suran/Spacebox (2011...2014)',
        '60': 'Ameo / Polo (Sedan with shortened trunk Indian production) [2017...]',
        '61': 'Polo Sedan (2011...)',
        '6C': 'Polo V (2015...)',
        '6E': 'Lupo 3L TDI',
        '6K': 'Polo III Classic (1995...2000)/ Variant (1997...2000)',
        '6N': 'Polo III (1994...2000)',
        '6S': 'Polo Vivo (Classic) (2015...)',
        '6R': 'Polo V (2009...2014)',
        '6V': 'Polo Classic / Variant',
        '6X': 'Lupo',
        '70': 'Transporter / Caravelle / Multivan T4 (1991...1996)',
        '7A': 'Taro (1989...1997)',
        '7D': 'Transporter / Caravelle / Multivan T4 (1996...2003)',
        '7E': 'Transporter / Multivan / Caravelle / California T5 (2010...2015)',
        '7H': 'Transporter / Multivan / Caravelle / California T5 (2003...2009)',
        '7L': 'Touareg (2002...2010)',
        '7M': 'Sharan I (1995...2010)',
        '7N': 'Sharan II (2010...)',
        '7P': 'Touareg II (2010...)',
        '80': 'Polo (1990-1994)',
        '82': 'Polo Coupe',
        '86': 'Polo I/II (...1994)',
        '87': 'Polo Classic/Coupe',
        '9C': 'New Beetle Europa (1999...2002)',
        '9K': 'Caddy',
        '9M': 'Jetta',
        '9N': 'Polo IV (1999...2010)',
        '9U': 'Caddy',
        'A1': 'T-Roc [2018...]',
        'A7': 'Polo (Sedan with shortened trunk Indian production for South America) [2017...]',
        'AA': 'up!',
        'AD': 'Tiguan II (2016...)',
        'AM': 'Golf Sportsvan (2015...)',
        'AU': 'Golf VII (typ 5g)',
        'BR': 'Gran Santana (2012...)',
        'C1': 'T-Cross [2019...]',
        'CA': 'Atlas [2017...], Atlas Cross Sport [2020...], Terramont [2018...]',
        'CD': 'Golf VIII [2020...]',
        'SA': 'Caddy IV [2016...]',
        'SE': 'Caddy IV [2016...]',
        'SG': 'Transporter / Multivan / Caravelle / California T6 [2015...2019]',
        'SV': 'Transporter / Multivan / Caravelle / California T6.1 [2019...]',
        'SY': 'Crafter / E-Crafter with enclosed body [2017...]',
        'SZ': 'Crafter / E-Crafter chassis [2017...]',
        'UY': 'MAN TGE 35 with enclosed body [2017...]',
        'UZ': 'MAN TGE 35 chassis [2017...]'
    },

    // 11th character - Assembly plant
    assemblyPlants: {
        'A': 'Ingolstadt, Germany',
        'B': 'Brussels, Belgium',
        'C': 'CCM-Taipei',
        'D': 'Barcelona, Spain / Bratislava, Slovakia (Touareg)',
        'E': 'Emden, Germany',
        'G': 'Graz, Austria / Kaluga, Russia',
        'H': 'Hannover, Germany',
        'K': 'Osnabrück, Germany',
        'M': 'Pueblo, Mexico',
        'N': 'Neckarsulm, Germany',
        'P': 'Mosel, Germany',
        'R': 'Martorell, Spain',
        'S': 'Salzgitter, Germany',
        'T': 'Sarajevo, Bosnia',
        'V': 'Westmoreland, USA / Palmela, Portugal',
        'W': 'Wolfsburg, Germany',
        'X': 'Poznań, Poland',
        'Y': 'Barcelona, Pamplona, Spain (through 1991)'
    },

    // American market specific data
    americanMarket: {
        // 4th character for Touareg
        touaregDrive: {
            'B': 'V6 engine, spring suspension',
            'C': 'V8 engine, spring suspension',
            'L': 'V6 engine, air suspension',
            'M': 'V8 engine, air suspension',
            'P': 'V10 engine, air suspension',
            'Z': 'V6/V8 engine, sport suspension'
        },

        // 5th character for Touareg
        touaregEngine: {
            'G': 'Gasoline V6, 3.6L',
            'M': 'Gasoline V8, 4.2L',
            'T': 'Diesel V10, 5.0L'
        },

        // 6th character - Safety systems
        safetySystems: {
            '0': 'Non-inertial seat belts',
            '2': 'Inertial seat belts',
            '3': 'Side airbags',
            '4': 'Automated seat belts',
            '5': 'Driver airbag and inertial seat belts',
            '6': 'Side curtain airbags',
            '7': 'Side airbags and side curtain airbags',
            '8': 'Driver and front passenger airbags',
            '9': 'Front airbags with staged deployment, front and rear side airbags, side curtain airbags'
        },

        // American market model codes (7th and 8th character)
        usModelCodes: {
            'A3': 'Passat (US market model)',
            'A9': 'Touareg (5L)',
            'AG': 'New Beetle (1C)',
            'AH': 'EOS (1F)',
            'AJ': 'Jetta (16) / Golf (1K)',
            'AL': 'New Beetle Convertible (1Y)',
            'AN': 'Passat CC (3C)',
            'AT': 'New Beetle II (16)',
            'AU': 'Golf VII / Golf Variant VII / Golf Sportwagon',
            'AX': 'Tiguan (5N)',
            'BP': 'Touareg II (5P)',
            'CA': 'Atlas (2017...)'
        }
    },

    // Main decoding function
    decodeVIN: function(vin) {
        if (!vin || vin.length < 11) {
            return { error: 'VIN must be at least 11 characters long' };
        }

        const result = {
            isVolkswagen: false,
            market: 'european', // default
            details: {}
        };

        // Check if it's a Volkswagen VIN
        const wmi = vin.substring(0, 3);
        if (wmi === 'WVW' || wmi === 'WV1' || wmi === 'WV2' || wmi === 'WV3') {
            result.isVolkswagen = true;
            
            // Determine market
            if (vin.includes('HE53A') || vin.length === 17 && vin[3] !== 'Z') {
                result.market = 'american';
            }

            // Get model code (7th and 8th characters)
            const modelCode = vin.substring(6, 8);
            if (result.market === 'american' && this.americanMarket.usModelCodes[modelCode]) {
                result.details.model = this.americanMarket.usModelCodes[modelCode];
            } else {
                result.details.model = this.modelCodes[modelCode] || 'Unknown model';
            }

            // Get assembly plant (11th character) - ONLY for European market
            if (result.market === 'european') {
                const plantCode = vin[10];
                result.details.assemblyPlant = this.assemblyPlants[plantCode] || 'Unknown assembly plant';
            }

            // American market specific decoding
            if (result.market === 'american') {
                // 4th character - Drive/Engine configuration (for Touareg)
                const driveCode = vin[3];
                result.details.driveConfig = this.americanMarket.touaregDrive[driveCode] || 'Standard configuration';

                // 5th character - Engine type (for Touareg)
                const engineCode = vin[4];
                result.details.engineType = this.americanMarket.touaregEngine[engineCode] || 'Standard engine';

                // 6th character - Safety systems
                const safetyCode = vin[5];
                result.details.safetySystems = this.americanMarket.safetySystems[safetyCode] || 'Standard safety systems';
            }

            // Get year from 10th character (using your existing year mapping)
            const yearCode = vin[9];
            const years = vinYearMap[yearCode];
            if (years) {
                result.details.productionYear = years.join(' or ');
            }
        }

        return result;
    }
};
