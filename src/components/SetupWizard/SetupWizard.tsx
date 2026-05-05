import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../useStore';
import './SetupWizard.css';

// 20 Standard Colors for the user to pick from
const MAIN_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', 
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', 
  '#ec4899', '#f43f5e', '#1e293b', '#64748b', '#ffffff'
];

// 5 Suggested Palettes (3 colors each: Primary, Secondary, Accent)
const PALETTES = [
  ['#1e293b', '#f8fafc', '#3b82f6'], // Modern Corporate
  ['#ec4899', '#fdf2f8', '#f472b6'], // Soft Beauty
  ['#064e3b', '#ecfdf5', '#10b981'], // Eco Green
  ['#450a0a', '#fef2f2', '#ef4444'], // Bold Red
  ['#171717', '#ffffff', '#eab308'], // High Contrast Dark
];

export default function SetupWizard() {
  const setField = useStore((state) => state.setField);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState('');
  const [profession, setProfession] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      if (selectedColors.length < 3) {
        setSelectedColors([...selectedColors, color]);
      }
    }
  };

  const selectPalette = (palette: string[]) => {
    setSelectedColors(palette);
  };

  const applyThemeAndNavigate = (colorsToApply: string[]) => {
    // Save Store Name & Profession
    setField("storeName", storeName || "UrStore");
    setField("storeProfession", profession);

    if (colorsToApply.length === 3) {
      const [primary, secondary, accent] = colorsToApply;
      
      // Map colors to global Zustand state
      setField("headerBgColor", primary);
      setField("footerBgColor", primary);
      setField("productImageBgColor", primary);
      
      setField("heroBgColor", secondary);
      setField("inventoryBgColor", secondary);
      setField("contactBgColor", secondary);
      
      setField("navLinkColor", accent);
      setField("heroBtnColor", accent);
      setField("heroTitleColor", accent);
      setField("productPriceColor", accent);
    }

    navigate('/header-step');
  };

  const handleSubmit = () => applyThemeAndNavigate(selectedColors);
  const handleSkip = () => applyThemeAndNavigate([]); // Pass empty array to skip theming

  return (
    <div className="wizard-overlay">
      <div className="wizard-container">
        <div className="wizard-header">
          <h2>Store Setup ({step}/3)</h2>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <div className="wizard-body">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="wizard-step">
              <h3>What is the name of your store?</h3>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)} 
                placeholder="e.g., Tech Haven"
                autoFocus
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="wizard-step">
              <h3>What is your store's profession or context?</h3>
              <select value={profession} onChange={(e) => setProfession(e.target.value)}>
                <option value="">Select a category...</option>
                <option value="fashion">Fashion & Clothing</option>
                <option value="electronics">Electronics & Tech</option>
                <option value="beauty">Beauty & Cosmetics</option>
                <option value="food">Food & Groceries</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="wizard-step">
              <h3>Choose your theme colors</h3>
              <p>Pick exactly 3 colors, or choose a suggested palette.</p>
              
              <h4>Individual Colors ({selectedColors.length}/3 selected)</h4>
              <div className="color-grid">
                {MAIN_COLORS.map((color) => (
                  <div 
                    key={color} 
                    className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => toggleColor(color)}
                  ></div>
                ))}
              </div>

              <h4>Suggested Palettes</h4>
              <div className="palette-grid">
                {PALETTES.map((palette, index) => (
                  <div 
                    key={index} 
                    className="palette-row" 
                    onClick={() => selectPalette(palette)}
                  >
                    {palette.map((color, i) => (
                      <div key={i} className="palette-color" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="wizard-footer">
          {step > 1 ? (
            <button className="btn-back" onClick={handleBack}>Back</button>
          ) : (
            <div></div> // Spacer
          )}
          
          <div>
            {step === 3 && <button className="btn-skip" onClick={handleSkip}>Skip Theme</button>}
            
            {step < 3 ? (
              <button className="btn-next" onClick={handleNext} disabled={step === 1 && !storeName}>Next</button>
            ) : (
              <button className="btn-submit" onClick={handleSubmit} disabled={selectedColors.length > 0 && selectedColors.length !== 3}>
                Start Building
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}