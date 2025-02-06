// const password = document.getElementById("password");
// const email = document.getElementById("email");

const supabaseUrl = "https://dpsnymvjqugamqrfrrys.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc255bXZqcXVnYW1xcmZycnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyODA5MzQsImV4cCI6MjA1Mjg1NjkzNH0.7g1hU78xsVqiVf7c-i2QBteTloi_N-vRvomr6Tgxjtg`;
const supaBase = supabase.createClient(supabaseUrl, supabaseKey);

async function signup(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  console.log("user email", email);
  console.log("user password", password);
  const { data, error } = await supaBase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Signup Error:", error.message);
    alert(`Error: error`);
  } else {
    console.log("Signup Successful:", data);
    alert("Signup successful! Please verify your email.");
  }
  console.log("data", data);
  console.log("error", error);
}

async function signin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;

  console.log("user email", email);
  console.log("user password", password);
  const { data, error } = await supaBase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Signin Error", error);
    alert("Sign-in error:", error.message);
  } else {
    console.log("Signup Successful", data);
    alert("Signed in successfully:", data);
  }
  if (signin(event)) {
    window.location.href = `dashboard.html`;
    alert("Navigate successful");
  }
  console.log("data", data);
  console.log("Error", error);
}

// const logout = document.getElementById("logout-btn");
// logout?.addEventListener(`click`, async () => {
//   try {
//     await supaBase.auth.signOut();
//     window.location.href = "index.html";
//     alert("Logout Successful");
//   } catch (err) {
//     console.error("Unexpecte error", err);
//     alert("Logout Failed!");
//   }
// });

const create = document.getElementById("upload");
create.addEventListener('click', async () => {
  console.log("suc");
    const imageFile = document.getElementById("image").files[0];
    console.log(imageFile,"sss");
  try {
    console.log(create);
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }
    console.log(imageFile);
    const imagePath = `blog-images/${Date.now()}-${imageFile.name}`;
    console.log(imagePath);
    const { data: uploadData, error: uploadError } = await supaBase.storage
      .from("uplaod_images")
      .upload(imagePath, imageFile);

      
    if (uploadError) throw uploadError;
    console.log("UploadData", uploadData);
    console.log("UploadError", uploadError);
    const { data: publicUrlData } = supaBase.storage
      .from("uplaod_images")
      .getPublicUrl(uploadData.path);
    const imageUrl = publicUrlData.publicUrl;

    console.log("Image uploaded:", imageUrl);
  } catch (error) {
    console.error("Error", error.message);
    alert("Failed to upload blog!");
  }
});
