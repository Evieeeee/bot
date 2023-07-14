const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('..evielator.db', `sqlite3.OPEN_READWRITE`);

db.serialize(() => {
  /*
    const stmt = db.prepare("INSERT INTO Guilds VALUES (?,?,?,?)")
    stmt.run("858264834378039317",
	  "298",
	  `"english", "german", "russian", "japanese"`,
	  "japanese");
    stmt.run("932330214669836348",
  "rox",
  `"english", "russian", "german", "french"`,
  "german"); 
  
stmt.run("870490758019448862",
  "hop",
  `"english", "chinese", "spanish", "turkish", "japanese", "ukranian", "portuguese"`,
  "chinese");

stmt.run("890984194728165457",
  "mynxx",
  `"english", "russian", "japanese", "ukranian", "spanish"`,
  "russian");

stmt.run("862777256937259039",
  "DDS",
  `"english", "russian", "german", "turkish", "polish"`,
  "russian");

stmt.run("873494360480706621",
  `"english", "german", "russian", "spanish", "japanese", "polish", "turkish"`,
  "Sassy",
  "russian");

stmt.run("920259869066539068",
  `"english", "korean", "japanese", "chinese"`,
  "420 Grow Op",
  "chinese");

stmt.run("990430774908035132",
  `"english", "ukranian"`,
  "BBB",
  "ukranian");

stmt.run("1059019606750142484",
 `"english", "german", "indonesian", "russian", "icelandic", "vietnamese", "japanese"`,
 "551",
  "japanese");
    
    stmt.finalize();*/
	/*const stmt2 = db.prepare(`INSERT INTO Languages VALUES(?,?,?,?)`);
          stmt2.run( "japanese",
          "JA",
          "<:japanheart:963280752903061514>",
          " <",
          );// ["JP"]
        

        
          stmt2.run( "korean",
          "KO",
          "<:korea:1069776301755473940>",
          "  ",
          );// ["KR"]
        
        
          stmt2.run( "indonesian",
          "ID",
          "<:indonesia:1064421149687160902>",
          "  Teks panjang, klik dropdown",
          );// [""]
        
        
          stmt2.run( "polish",
          "PL",
          "<:polish:966218766864232448>",
          "  Nie kompletny",
          );// [""]
        
          
          stmt2.run( "german",
          "DE",
          "<:germanheart:963278049082753065>",
          " Unvollstndig",
          );// ["AT"]
        
            
          stmt2.run( "chinese",
          "zh-TW",
          "<:taiwanheart:961941083753938944>",
          "  ",
          );// ["CN"]
        
              
          stmt2.run( "spanish",
          "ES",
          "<:spanishflag:963277725446053990>",
          "\ No completo",
          );// ["MX","EA","CL","EC","HN"]
        
        
          stmt2.run( "ukranian",
          "UK",
          "<:ukrheart:961941054125379615>",
          "  ",
          );// ["UA"]
        
        
          stmt2.run( "french",
          "FR",
          "<:french:1059332770427588700>",
          " Message incomplet",
          );// ["ci"]
          
        
          stmt2.run( "russian",
          "RU",
          "<:russia:1059332768124907610>",
          "   ",
          );// ["RS"]
        
         
          stmt2.run( "turkish",
          "TR",
          "<:turkey:1059323499468034068>",
          "Mesaj Eksik",
          );// [""]
        
          stmt2.run( "vietnamese",
          "VI",
          "<:viet:1068001205432893581>",
          "n tin nhn ting vit di, nhp vo menu th xung",
          );// ["vn"]
        
          stmt2.run( "icelandic",
          "IS",
          "<:ICELAND:1059320414892986368>",
          "Lng skilabo, smelltu  fellilistann",
          );// [""]
       
        
          stmt2.run( "english",
          "EN",
          "<:gbheart:961891996077801482>",
          " Not Complete",
          );// ["AU","GB","US","UM","NZ"]
          stmt2.finalize();
        });

    db.each("SELECT * FROM guild", (err, row) => {
        console.log(row);
    });
*/
	//298
const stmt3 = db.prepare(`INSERT INTO L2G_Bridge VALUES(?,?)`);
        stmt3.run( "858264834378039317",
          "english");
        stmt3.run( "858264834378039317",
          "russian");
        stmt3.run( "858264834378039317",
          "german");
        stmt3.run( "858264834378039317",
          "japanese");
		stmt3.run( "932330214669836348",
          "english");
		stmt3.run( "932330214669836348",
          "russian");
		stmt3.run( "932330214669836348",
          "german");
		stmt3.run( "932330214669836348",
          "french");
		stmt3.run( "932330214669836348",
          "german");
		stmt3.run( "870490758019448862",
          "english");
		stmt3.run( "870490758019448862",
          "chinese");
		stmt3.run( "870490758019448862",
          "turkish");
		stmt3.run( "890984194728165457",
          "english");
		stmt3.run( "890984194728165457",
          "russian");
		stmt3.run( "890984194728165457",
          "japanese");
		stmt3.run( "890984194728165457",
          "ukranian");
		stmt3.run( "890984194728165457",
          "english");
		stmt3.run( "862777256937259039",
          "russian");
		stmt3.run( "862777256937259039",
          "german");
		stmt3.run( "862777256937259039",
          "turkish");
		stmt3.run( "862777256937259039",
          "polish");
		stmt3.run( "873494360480706621",
          "english");
		stmt3.run( "873494360480706621",
          "german");
		stmt3.run( "873494360480706621",
          "russian");
		stmt3.run( "873494360480706621",
          "spanish");
		stmt3.run( "873494360480706621",
          "japanese");
		stmt3.run( "873494360480706621",
          "polish");
		stmt3.run( "873494360480706621",
          "turkish");
		stmt3.run( "920259869066539068",
          "english");
		stmt3.run( "920259869066539068",
          "korean");
		stmt3.run( "920259869066539068",
          "japanese");
		stmt3.run( "920259869066539068",
          "chinese");
		stmt3.run( "920259869066539068",
          "english");
		stmt3.run( "920259869066539068",
          "ukranian");
		stmt3.run( "920259869066539068",
          "english");
		stmt3.run( "920259869066539068",
          "german");
		stmt3.run( "920259869066539068",
          "indonesian");
		stmt3.run( "920259869066539068",
          "russian");
		stmt3.run( "920259869066539068",
          "icelandic");
		stmt3.run( "920259869066539068",
          "french");
		stmt3.run( "920259869066539068",
          "portugese");
          stmt3.finalize();
        });

    db.each("SELECT * FROM L2G_Bridge", (err, row) => {
        console.log(row);
    });	
db.close();
