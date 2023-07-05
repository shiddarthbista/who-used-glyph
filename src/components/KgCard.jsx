import React from "react";
import "./KgCard.css";

function KGCard({ responseData }) {
  // Hardcoded KG members' userSteamIDs
    // Create a mapping of Steam IDs to names
    const kgMembers = {
        "76561198313214610": "Dust Dai",
        "76561198128030555": "Volley",
        "76561198843133341": "Tap Tap",
        "76561198220494936": "Shitosh Dai",
        "76561198067336390": "Amulya Stha",
        "76561198221627924": "Subhay Dai",
        "76561198165532254": "Ashok Dai",
        "76561198110891923": "Ananta Dai",
        "76561198202296442": "Diresh"
      };
    
      // Filter glyph usages by KG members
      const kgGlyphUsages = responseData.filter(
        (item) => item.UserSteamID in kgMembers
      );
    
      return (
        <div className="kg-members">
          <h1>YESLE HANYO GLYPH</h1>
          {kgGlyphUsages.length > 0 ? (
            <ul>
              {kgGlyphUsages.map((item, index) => (
                <li key={index}>
                  <span>{kgMembers[item.UserSteamID]}</span> -{" "}
                  <span>
                    {item.Minute}:{item.Second}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No KG members used the glyph in this game.</p>
          )}
        </div>
      );
    }

export default KGCard;