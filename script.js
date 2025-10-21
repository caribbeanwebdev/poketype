// Pokemon types
const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const typeNames = {
    'normal': 'Normal',
    'fire': 'Fuego',
    'water': 'Agua',
    'electric': 'Eléctrico',
    'grass': 'Planta',
    'ice': 'Hielo',
    'fighting': 'Lucha',
    'poison': 'Veneno',
    'ground': 'Tierra',
    'flying': 'Volador',
    'psychic': 'Psíquico',
    'bug': 'Bicho',
    'rock': 'Roca',
    'ghost': 'Fantasma',
    'dragon': 'Dragón',
    'dark': 'Siniestro',
    'steel': 'Acero',
    'fairy': 'Hada'
};

// Type effectiveness chart
// 2 = Super effective, 0.5 = Not very effective, 0 = No effect
const typeChart = {
    'normal': {
        'rock': 0.5, 'ghost': 0, 'steel': 0.5
    },
    'fire': {
        'fire': 0.5, 'water': 0.5, 'grass': 2, 'ice': 2, 'bug': 2, 'rock': 0.5, 'dragon': 0.5, 'steel': 2
    },
    'water': {
        'fire': 2, 'water': 0.5, 'grass': 0.5, 'ground': 2, 'rock': 2, 'dragon': 0.5
    },
    'electric': {
        'water': 2, 'electric': 0.5, 'grass': 0.5, 'ground': 0, 'flying': 2, 'dragon': 0.5
    },
    'grass': {
        'fire': 0.5, 'water': 2, 'grass': 0.5, 'poison': 0.5, 'ground': 2, 'flying': 0.5, 'bug': 0.5, 'rock': 2, 'dragon': 0.5, 'steel': 0.5
    },
    'ice': {
        'fire': 0.5, 'water': 0.5, 'grass': 2, 'ice': 0.5, 'ground': 2, 'flying': 2, 'dragon': 2, 'steel': 0.5
    },
    'fighting': {
        'normal': 2, 'ice': 2, 'poison': 0.5, 'flying': 0.5, 'psychic': 0.5, 'bug': 0.5, 'rock': 2, 'ghost': 0, 'dark': 2, 'steel': 2, 'fairy': 0.5
    },
    'poison': {
        'grass': 2, 'poison': 0.5, 'ground': 0.5, 'rock': 0.5, 'ghost': 0.5, 'steel': 0, 'fairy': 2
    },
    'ground': {
        'fire': 2, 'electric': 2, 'grass': 0.5, 'poison': 2, 'flying': 0, 'bug': 0.5, 'rock': 2, 'steel': 2
    },
    'flying': {
        'electric': 0.5, 'grass': 2, 'fighting': 2, 'bug': 2, 'rock': 0.5, 'steel': 0.5
    },
    'psychic': {
        'fighting': 2, 'poison': 2, 'psychic': 0.5, 'dark': 0, 'steel': 0.5
    },
    'bug': {
        'fire': 0.5, 'grass': 2, 'fighting': 0.5, 'poison': 0.5, 'flying': 0.5, 'psychic': 2, 'ghost': 0.5, 'dark': 2, 'steel': 0.5, 'fairy': 0.5
    },
    'rock': {
        'fire': 2, 'ice': 2, 'fighting': 0.5, 'ground': 0.5, 'flying': 2, 'bug': 2, 'steel': 0.5
    },
    'ghost': {
        'normal': 0, 'psychic': 2, 'ghost': 2, 'dark': 0.5
    },
    'dragon': {
        'dragon': 2, 'steel': 0.5, 'fairy': 0
    },
    'dark': {
        'fighting': 0.5, 'psychic': 2, 'ghost': 2, 'dark': 0.5, 'fairy': 0.5
    },
    'steel': {
        'fire': 0.5, 'water': 0.5, 'electric': 0.5, 'ice': 2, 'rock': 2, 'steel': 0.5, 'fairy': 2
    },
    'fairy': {
        'fire': 0.5, 'fighting': 2, 'poison': 0.5, 'dragon': 2, 'dark': 2, 'steel': 0.5
    }
};

// State
let selectedAttackType = '';
let selectedDefenderType1 = '';
let selectedDefenderType2 = '';

// Initialize the page
function init() {
    renderTypeButtons('attackType', (type) => {
        selectedAttackType = type;
        updateActiveButton('attackType', type);
    });

    renderTypeButtons('defenderType1', (type) => {
        selectedDefenderType1 = type;
        updateActiveButton('defenderType1', type);
    });

    renderTypeButtons('defenderType2', (type) => {
        selectedDefenderType2 = type;
        updateActiveButton('defenderType2', type);
    }, true);
}

// Render type buttons
function renderTypeButtons(containerId, onClick, includeNone = false) {
    const container = document.getElementById(containerId);
    const existingButtons = container.querySelectorAll('.type-button:not(.none-type)');
    existingButtons.forEach(btn => btn.remove());

    types.forEach(type => {
        const button = document.createElement('button');
        button.className = `type-button type-${type}`;
        button.textContent = typeNames[type];
        button.dataset.type = type;
        button.onclick = () => onClick(type);
        container.appendChild(button);
    });

    // Handle none button for defender type 2
    if (includeNone) {
        const noneButton = container.querySelector('.none-type');
        if (noneButton) {
            noneButton.onclick = () => onClick('');
        }
    }
}

// Update active button
function updateActiveButton(containerId, selectedType) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('.type-button');
    buttons.forEach(btn => {
        if (btn.dataset.type === selectedType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Get type effectiveness
function getEffectiveness(attackType, defenderType) {
    if (!attackType || !defenderType) return 1;
    return typeChart[attackType]?.[defenderType] || 1;
}

// Calculate total effectiveness
function calculateTypeEffectiveness(attackType, defenderType1, defenderType2) {
    let effectiveness = 1;
    effectiveness *= getEffectiveness(attackType, defenderType1);
    if (defenderType2) {
        effectiveness *= getEffectiveness(attackType, defenderType2);
    }
    return effectiveness;
}

// Calculate damage
function calculateDamage() {
    // Validate inputs
    if (!selectedAttackType) {
        alert('Por favor selecciona un tipo de ataque');
        return;
    }
    if (!selectedDefenderType1) {
        alert('Por favor selecciona al menos un tipo defensor');
        return;
    }

    // Get input values
    const attackStat = parseInt(document.getElementById('attackStat').value);
    const defenseStat = parseInt(document.getElementById('defenseStat').value);
    const basePower = parseInt(document.getElementById('basePower').value);
    const level = parseInt(document.getElementById('level').value);
    const stab = document.getElementById('stab').checked;
    const criticalHit = document.getElementById('criticalHit').checked;

    // Calculate type effectiveness
    const effectiveness = calculateTypeEffectiveness(
        selectedAttackType,
        selectedDefenderType1,
        selectedDefenderType2
    );

    // Calculate base damage (Gen V+ formula)
    const levelMultiplier = ((2 * level) / 5) + 2;
    const baseDamage = (levelMultiplier * basePower * (attackStat / defenseStat)) / 50;

    // Apply modifiers
    let modifier = 1;

    // STAB
    if (stab) {
        modifier *= 1.5;
    }

    // Type effectiveness
    modifier *= effectiveness;

    // Critical hit
    if (criticalHit) {
        modifier *= 1.5;
    }

    // Calculate damage range (random factor is 0.85 to 1.00)
    const minDamage = Math.floor((baseDamage + 2) * modifier * 0.85);
    const maxDamage = Math.floor((baseDamage + 2) * modifier * 1.00);

    // Assume defender HP is 200 for percentage calculation (can be customized)
    const assumedHP = 200;
    const minPercent = ((minDamage / assumedHP) * 100).toFixed(1);
    const maxPercent = ((maxDamage / assumedHP) * 100).toFixed(1);

    // Display results
    displayResults(effectiveness, minDamage, maxDamage, minPercent, maxPercent);
}

// Display results
function displayResults(effectiveness, minDamage, maxDamage, minPercent, maxPercent) {
    const resultDiv = document.getElementById('result');
    const effectivenessValue = document.getElementById('effectivenessValue');
    const effectivenessMessage = document.getElementById('effectivenessMessage');

    // Set effectiveness display
    effectivenessValue.textContent = `×${effectiveness.toFixed(2)}`;

    // Set effectiveness class and message
    let effectivenessClass = 'effectiveness-normal';
    let message = '';

    if (effectiveness === 0) {
        effectivenessClass = 'effectiveness-no-effect';
        message = '¡No tiene ningún efecto!';
    } else if (effectiveness < 1) {
        effectivenessClass = 'effectiveness-not-very';
        message = 'No es muy eficaz...';
    } else if (effectiveness === 1) {
        effectivenessClass = 'effectiveness-normal';
        message = 'Eficacia normal';
    } else if (effectiveness >= 2) {
        effectivenessClass = 'effectiveness-super';
        message = '¡Es súper eficaz!';
    }

    effectivenessValue.className = `effectiveness-value ${effectivenessClass}`;
    effectivenessMessage.textContent = message;

    // Set damage values
    document.getElementById('minDamage').textContent = minDamage;
    document.getElementById('maxDamage').textContent = maxDamage;
    document.getElementById('minPercent').textContent = minPercent;
    document.getElementById('maxPercent').textContent = maxPercent;

    // Show result
    resultDiv.style.display = 'block';

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
