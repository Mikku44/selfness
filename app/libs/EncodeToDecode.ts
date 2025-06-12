export function encodeToBase64(data: any): string {
  try {
    const jsonString = JSON.stringify(data);
    const encoded = btoa(unescape(encodeURIComponent(jsonString)));
    return encoded;
  } catch (error) {
    console.error("Error encoding data to Base64:", error);
    return "";
  }
}


export function decodeFromBase64(base64: string): any {
   try {
    const jsonString = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error decoding Base64 to data:", error);
    return null;
  }
}


export function encodeToRandom(data: any): string {
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    
    let result = "";
    for (let i = 0; i < data.length; i++) {
        // Get char code and add 10
        const charCode = data.charCodeAt(i) + 10;
        result += String.fromCharCode(charCode);
    }
    return btoa(result); // Base64 encode for better URL compatibility
}

export function decodeFromRandom(encoded: string): any {
    try {
        const decoded = atob(encoded);
        let result = "";
        for (let i = 0; i < decoded.length; i++) {
            // Subtract 10 to reverse the encoding
            const charCode = decoded.charCodeAt(i) - 10;
            result += String.fromCharCode(charCode);
        }
        
        // Try to parse as JSON if possible
        try {
            return JSON.parse(result);
        } catch {
            return result;
        }
    } catch (error) {
        console.error("Decoding failed:", error);
        return null;
    }
}