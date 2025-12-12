import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [storeName, setStoreName] = useState("Precious Scent");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("storeName", storeName);
    formData.append("description", description);
    formData.append("whatsapp", whatsapp);
    formData.append("instagram", instagram);
    formData.append("tiktok", tiktok);
    formData.append("email", email);

    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const response = await fetch("http://localhost:5000/settings", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert("Settings saved successfully!");
      console.log("Saved settings:", data);

    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Check backend.");
    }
  };

  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>

      <form className="settings-form" onSubmit={handleSubmit}>
        
        <label>Store Name</label>
        <input 
          type="text" 
          value={storeName} 
          onChange={(e) => setStoreName(e.target.value)} 
        />

        <label>Store Description</label>
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write something about your store..."
        />

        <label>WhatsApp Number</label>
        <input 
          type="text" 
          value={whatsapp} 
          onChange={(e) => setWhatsapp(e.target.value)} 
          placeholder="+234 802..."
        />

        <label>Instagram Link</label>
        <input 
          type="text" 
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="https://instagram.com/..."
        />

        <label>TikTok Link</label>
        <input 
          type="text" 
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          placeholder="https://tiktok.com/@..."
        />

        <label>Email Address</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@gmail.com"
        />

        <label>Upload Logo</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])} 
        />

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
