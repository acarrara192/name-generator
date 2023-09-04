import './App.css';
import { useState } from 'react';
import elfPrefixes from './elf_prefixes';
import elfSuffixes from './elf_suffixes';
import drowPrefixes from './drow_prefixes';
import drowSuffixes from './drow_suffixes';
 
// a helper function to select a random object from a list javascript objects
function getRandomObjectFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// takes as input a list of suffixes and prefixes 
// generates an Elven Name using the schema prefix + suffix
function generateNameSimple(drowMode){
  
  let prefixes = drowMode ? drowPrefixes : elfPrefixes;
  let suffixes = drowMode ? drowSuffixes : elfSuffixes;

  let prefixObject = getRandomObjectFromArray(prefixes);
  let suffixObject = getRandomObjectFromArray(suffixes);

  let randomname = prefixObject.prefix.concat(suffixObject.suffix);
  let meaning = prefixObject.meaning.concat(', ', suffixObject.meaning)
  return randomname.concat(" — ", meaning)
}

// takes as input a list of suffixes and prefixes 
// generates an Elven Name using the schema prefix + suffix + suffix
function generateNameDoubleSuffix(drowMode){
  let prefixes = drowMode ? drowPrefixes : elfPrefixes;
  let suffixes = drowMode ? drowSuffixes : elfSuffixes;

  let prefixObject = getRandomObjectFromArray(prefixes);
  let suffixObject1 = getRandomObjectFromArray(suffixes);
  let suffixObject2 = getRandomObjectFromArray(suffixes);
  let randomname = prefixObject.prefix.concat(suffixObject1.suffix, suffixObject2.suffix);
  let meaning = prefixObject.meaning.concat(', ', suffixObject1.meaning, ', ', suffixObject2.meaning);
  return randomname.concat(" — ", meaning);
}

// capitalizes the first letter of a string
function capitalizeFLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

// takes as input a list of suffixes and prefixes 
// generates an Elven Name using the schema suffix' + prefix + suffix
function generateNameApostrophe(drowMode){
  let prefixes = drowMode ? drowPrefixes : elfPrefixes;
  let suffixes = drowMode ? drowSuffixes : elfSuffixes;

  let prefixObject = getRandomObjectFromArray(prefixes);
  let suffixObject1 = getRandomObjectFromArray(suffixes);
  let suffixObject2 = getRandomObjectFromArray(suffixes);
  let randomname = capitalizeFLetter(suffixObject1.suffix).concat("'", prefixObject.prefix, suffixObject2.suffix);
  let meaning = suffixObject1.meaning.concat(', ', prefixObject.meaning, ', ', suffixObject2.meaning);
  return randomname.concat(" — ", meaning);
  }

  // takes as input a string determining what generation type to use, 
  // and calls the corrresponding generation function. 
  // 1 - simple, 2 - double, 3 - apostrophe
  function GenerateName(type, drowMode){
    switch(type){
      case 1: 
      return generateNameSimple(drowMode);
      
      case 2:
      return generateNameDoubleSuffix(drowMode);
      
      case 3:
      return generateNameApostrophe(drowMode);

      default:
      return generateNameSimple(drowMode);
    }
  }


// creates an array of 6 integers between 1-3, and maps them to their respective generation types.  
function GenerateNames(drowMode) {
  let generationTypeArray = Array.from({length: 6}, () => Math.floor(Math.random() * 3) + 1)
  let elvenNamesArray = generationTypeArray.map( (num) => GenerateName(num, drowMode))
  return elvenNamesArray;
}


function App() {
  const [names, setNames] = useState([]);
  const [drowModeEnabled, setDrowModeEnabled] = useState(false); // Initialize to false

  const handleGenerateNames = () => {
    const generatedNames = GenerateNames(drowModeEnabled);
    setNames(generatedNames);
  }

  function handleDrowModeToggle() {
    setDrowModeEnabled(!drowModeEnabled); 
    const generatedNames = GenerateNames(drowModeEnabled);
    setNames(generatedNames);
  }

   return (
    <div className="App">
      <header className={drowModeEnabled? "App-header-dark" : "App-header"}>
        <div className={drowModeEnabled? "drow-themed-div" : "elven-themed-div"}>
        <header> {drowModeEnabled ? "Ari's Drow Name Generator" : "Ari's Elven Name Generator"} </header>
        <hr></hr>
        <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
        <button onClick={handleGenerateNames}> Generate </button>
        <input type="checkbox" id="checkbox" checked={drowModeEnabled} onChange={handleDrowModeToggle} />
        </div>
        <p> image by vecstock </p>
      </header>
    </div>
    );
  }

export default App;
