const PUBLISHER = 'https://publisher.walrus-testnet.walrus.space';

export async function storeStringAndGetBlobId(data: string) {
  try {
    console.log("store walrus start: " + data.slice(0,100) + "...")
    // Make the API call to store the string
    const response = await fetch(`${PUBLISHER}/v1/store`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: data,
    });

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to store data: ${response.statusText}`);
    }

    // Parse the response to get the blob id
    const result = await response.json();
    console.log(result);
    
    let blobId: string | null = null;

    // Check for "alreadyCertified" or "newlyCreated" in the response and extract blobId
    if (result.alreadyCertified && result.alreadyCertified.blobId) {
      blobId = result.alreadyCertified.blobId;
    } else if (result.newlyCreated && result.newlyCreated.blobObject && result.newlyCreated.blobObject.blobId) {
      blobId = result.newlyCreated.blobObject.blobId;
    }

    if (blobId) {
      console.log('Blob ID:', blobId);
      return blobId;
    } else {
      throw new Error('Blob ID not found in response.');
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
