export const generateOrder=()=> {
  
    // Generate a random alphanumeric string
    const randomString = Math.random().toString(10).substring(2, 8);
    
    // Get current timestamp
 
    
    // Concatenate random string and timestamp with a prefix 'branch_'
    const branchName = `order-${randomString}`;
    
    return branchName;
  }
  
  console.log(generateOrder)


