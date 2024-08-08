import { apiService } from "./apiService";

interface type {
  role: string;
  content: string;
}
const baseUrl = process.env.REACT_APP_AZURE_END_POINT  || '';

export const azureService = {
  completions: async (conversation: type[]) => {
    const deploymentsName = "gpt-4o-mini"
    const chatUrl = `/openai/deployments/${deploymentsName}/chat/completions`;

    const header = {
      "api-key": "78aec26ae1ea4097af6a68cc4431daf1",
      "Content-Type": "application/json",
    };

    const queryParam = {
      "api-version": "2024-02-15-preview",
    };

    const body = {
      messages: conversation,
      stream: false,
    };

    const result = await apiService.post(
      chatUrl,
      body,
      queryParam,
      header,
      baseUrl,
    );

    return result?.choices[0].message.content;
  },
  images: async (prompt : string) => {
    

    const apiKey = process.env.REACT_APP_AZURE_API_KEY  || '';
    const apiVersion  = "2024-05-01-preview";
    const deploymentsName = "Dalle3"

    const url = `/openai/deployments/${deploymentsName}/images/generations`;
    const header= { 
      "api-key": apiKey, 
      "Content-Type": "application/json" 
    }

    const queryParam = {
      "api-version":apiVersion,
    };
    const body = {
        prompt,
        size: "1024x1024",
        n: 1,
        quality: "standard", // hd, standard
        style: "vivid"// natural, vvid 
    }

    const result = await apiService.post(
      url,
      body,
      queryParam,
      header,
      baseUrl,
    );

    console.log(result);

    return result?.data[0].url;

  },
  imagesAu: async (prompt : string, modelName: string) => {
    

    const apiKey = "980939685a224485b26208c81679bd1b";
    const apiVersion  = "2024-05-01-preview";
    const deploymentsName = "Dalle3"

    const url = `/openai/deployments/${modelName}/images/generations`;
    const header= { 
      "api-key": apiKey, 
      "Content-Type": "application/json" 
    }

    const queryParam = {
      "api-version":apiVersion,
    };
    const body = {
        prompt,
        size: "1024x1024",
        n: 1,
        quality: "standard", // hd, standard
        style: "vivid"// natural, vvid 
    }

    const result = await apiService.post(
      url,
      body,
      queryParam,
      header,
      "https://shcard-poc-au.openai.azure.com/",
    );

    console.log(result);

    return result?.data[0].url;

  }
};
