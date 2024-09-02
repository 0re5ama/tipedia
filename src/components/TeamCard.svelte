<script>
    /** @type {any} */
    export let team;

    /** @type {any[]} */
    export let players;
</script>

<div class="team-grid">
    <div class="team-info">
        <div class="logo">
            <img
                loading="lazy"
                class="team-logo"
                src="https://cdn.akamai.steamstatic.com/apps/dota2/teamlogos/{team.team_id}.png"
                alt={team.team_name} />
        </div>
        <div class="players">
            <ul>
                {#each players.filter((x) => x.team_id == team.team_id) as player}
                    <li>
                        <img
                            loading="lazy"
                            class="profile"
                            src="https://cdn.akamai.steamstatic.com/apps/dota2/players/{player.account_id}.png"
                            alt={team.team_name} />
                        {player.name}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="name">{team.team_name}</div>
</div>

<style>
    img.team-logo {
        background-color: #000c03;
        padding: 0.5em;
    }
    .team-grid {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
        padding: 0.5rem;
    }

    .team-grid:hover {
        background: url('https://clan.akamai.steamstatic.com/images//3703047/67cdd64151254a75d7f2304eca540970c636548f.jpg');
        background-position: center;
        background-size: cover;
        color: #f1f1f1;
    }

    .team-grid .team-info .players {
        display: none;
        ul {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
        }
        ul li {
            display: flex;
            align-items: center;
            gap: 1em;
        }
    }

    .team-grid:hover .team-info .players {
        display: flex;
        flex: 1 0;
        font-size: 0.7em;
    }

    .team-grid .team-info {
        display: flex;
        width: 100%;
        background-color: #000c03;
        justify-content: center;
        align-items: center;
        flex: 1 0;
    }

    .team-grid:hover .team-info img.team-logo {
        height: 6em;
    }

    .team-grid:hover .team-info {
        background-color: #000c03;
        flex-direction: row;
        ul {
            list-style: none;
        }
    }

    .team-grid img.team-logo {
        height: 10em;
    }

    .team-grid .name {
        font-size: 1.25rem;
        font-weight: 500;
    }

    img.profile {
        height: 2em;
        border: 1px solid white;
        border-radius: 100em;
    }
</style>
