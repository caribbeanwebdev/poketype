# Calculadora de Daño Pokémon

Una aplicación web interactiva para calcular el daño de ataques Pokémon considerando la efectividad de tipos.

## Características

- **Calculadora de efectividad de tipos**: Calcula la efectividad de ataques basándose en los 18 tipos de Pokémon
- **Cálculo de daño preciso**: Utiliza la fórmula de combate de Pokémon (Generación V+)
- **Tipos duales**: Soporte para Pokémon con dos tipos
- **Modificadores de combate**:
  - STAB (Same Type Attack Bonus)
  - Golpe Crítico
- **Interfaz intuitiva**: Diseño responsivo y fácil de usar

## Cómo usar

1. Abre `index.html` en tu navegador web
2. Selecciona el tipo de ataque
3. Selecciona el(los) tipo(s) del Pokémon defensor
4. Ingresa las estadísticas:
   - Ataque/Ataque Especial del atacante
   - Defensa/Defensa Especial del defensor
   - Potencia base del movimiento
   - Nivel del Pokémon atacante
5. Marca las casillas de STAB o Golpe Crítico si aplican
6. Haz clic en "Calcular Daño"

## Fórmula de Daño

La calculadora utiliza la fórmula de daño de Pokémon de la Generación V en adelante:

```
Daño = ((((2 × Nivel) / 5) + 2) × Potencia × (Ataque / Defensa)) / 50) + 2) × Modificadores
```

### Modificadores incluyen:
- **STAB**: ×1.5 si el ataque es del mismo tipo que el Pokémon
- **Efectividad de tipo**: ×0, ×0.25, ×0.5, ×1, ×2, o ×4
- **Golpe crítico**: ×1.5
- **Factor aleatorio**: 0.85 a 1.00

## Efectividad de Tipos

La aplicación incluye la tabla completa de efectividades de tipos:
- **×2**: Súper eficaz
- **×1**: Eficacia normal
- **×0.5**: No muy eficaz
- **×0**: Sin efecto

Para Pokémon con doble tipo, las efectividades se multiplican (ej: Agua vs Roca/Tierra = ×4)

## Tecnologías

- HTML5
- CSS3 (Diseño responsivo con gradientes)
- JavaScript Vanilla (sin dependencias)

## Tipos de Pokémon Soportados

Normal, Fuego, Agua, Eléctrico, Planta, Hielo, Lucha, Veneno, Tierra, Volador, Psíquico, Bicho, Roca, Fantasma, Dragón, Siniestro, Acero, Hada

## Compatibilidad

Funciona en todos los navegadores modernos:
- Chrome/Edge
- Firefox
- Safari
- Opera
