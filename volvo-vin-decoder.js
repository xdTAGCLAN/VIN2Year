// volvo-vin-decoder.js
const volvoVinDecoder = {
    decodeVIN: async function(vin) {
        const volvoWMIs = ['3CE', '4V2', '4V4', '4V5', '4VG', '4VH', '7JR', '9BV', 'LVY', 'LYV', 'SCV', 'VS9', 'XLB', 'YB1', 'YB2', 'YB3', 'YV1', 'YV2', 'YV3', 'YV4', 'YV5', 'YV9', 'YVZ'];
        const wmi = vin.substring(0, 3);
        
        if (!volvoWMIs.includes(wmi)) {
            return { isVolvo: false };
        }

        try {
            const volvoData = await this.fetchVolvoData(vin);
            return {
                isVolvo: true,
                details: volvoData
            };
        } catch (error) {
            console.error('Error fetching Volvo data:', error);
            return {
                isVolvo: true,
                details: {
                    error: 'Could not fetch detailed Volvo information',
                    fallbackInfo: this.getFallbackVolvoInfo(vin)
                }
            };
        }
    },

    fetchVolvoData: async function(vin) {
        const payload = {
            "query": `
            fragment carRelease on CarRelease {
                id
                displayName
                modelSlug
                modelCode
                structureWeek
                modelYear
                isLatestRelease
            }

            query CarDetails($vin: String!) {
                carByVin(vin: $vin) {
                    ...carRelease
                }
            }
            `,
            "variables": {"vin": vin},
            "operationName": "CarDetails"
        };

        const headers = {
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0'
        };

        const response = await fetch('https://www.volvocars.com/api/support/graphql', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data.carByVin || { error: 'No data returned from Volvo API' };
    },

    getFallbackVolvoInfo: function(vin) {
        // Fallback basic decoding if API fails
        const info = {
            vin: vin,
            manufacturer: 'Volvo',
            note: 'Basic info (API unavailable)'
        };
        
        // Basic VIN structure decoding for Volvo
        const modelCode = vin.substring(3, 6);
        const series = vin.substring(6, 7);
        
        info.modelSegment = this.decodeModelSegment(modelCode);
        info.series = `Series ${series}`;
        
        return info;
    },

    decodeModelSegment: function(modelCode) {
        const segments = {
            'L5C': 'XC40',
            'L5B': 'XC40 Recharge',
            'L42': 'XC60',
            'L43': 'XC60 Recharge',
            'L31': 'XC90',
            'L32': 'XC90 Recharge',
            '246': 'S60',
            '247': 'S60 Recharge',
            '256': 'S90',
            '257': 'S90 Recharge',
            '526': 'V60',
            '527': 'V60 Recharge',
            '536': 'V90',
            '537': 'V90 Recharge'
        };
        
        return segments[modelCode] || `Model Code: ${modelCode}`;
    }
};