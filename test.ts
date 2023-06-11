import { MonsterSet } from 'teams';
import {Battle} from './battle';


const testTeam1:MonsterSet[] = [
    {
        species: "Charizard",
        coat: "Shiny",
        ability: "Blaze",
        moves: ["Flamethrower", "Air Slash", "Dragon Pulse", "Solar Beam"],
        nature: "Timid",
        gender: "male",
        evs: [0, 0, 0, 252, 4, 252],
        ivs: [31, 31, 31, 31, 31, 31],
        level: 100,
        height: 1.7,
        weight: 90.5,
    }
]

const testTeam2 = [
    {
        species: "Charizard",
        coat: "Shiny",
        ability: "Blaze",
        moves: ["Flamethrower", "Air Slash", "Dragon Pulse", "Solar Beam"],
        nature: "Timid",
        gender: "male",
        evs: [0, 0, 0, 252, 4, 252],
        ivs: [31, 31, 31, 31, 31, 31],
        level: 100,
        height: 1.7,
        weight: 90.5,
    }
]

const battle = new Battle({
    debug: true,
    playerPlayload: [
        {
            playerId: 1,
            playerName: "Player 1",
            team: testTeam1,
        },
        {
            playerId: 2,
            playerName: "Player 2",
            team: testTeam2,
        }
    ]
})
