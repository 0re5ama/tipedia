<script>
    /**
     * @typedef {Object} LeagueInfoType
     * @property {string} name
     * @property {string} description
     * @property {number} start_timestamp
     * @property {number} end_timestamp
     */

    import TeamCard from '../../components/TeamCard.svelte';

    /**
     * @typedef {Object} PrizePoolType
     * @property {number} base_prize_pool
     * @property {number} total_prize_pool
     */

    /**
     * @typedef {Object} NodeGroupType
     * @property {string} name
     * @property {any[]} team_standings
     * @property {NodeGroupType[]} node_groups
     */

    /**
     * @typedef {Object} LeagueType
     * @property {any[]} registered_players
     * @property {LeagueInfoType} info
     * @property {PrizePoolType} prize_pool
     * @property {NodeGroupType[]} node_groups
     * @property {any} teams
     */

    /**
     * @typedef {Object} DataType
     * @property {LeagueType} league
     */

    /** @type {DataType} */
    export let data;

    /**
     * A map of classnames for all letters that have been guessed,
     * used for styling the keyboard
     * @type {Record<string, 'exact' | 'close' | 'missing'>}
     */
    let classnames;

    /**
     * A map of descriptions for all letters that have been guessed,
     * used for adding text for assistive technology (e.g. screen readers)
     * @type {Record<string, string>}
     */
    let description;

    /**
     * Trigger form logic in response to a keydown event, so that
     * desktop users can use the keyboard to play the game
     * @param {KeyboardEvent} event
     */
    function keydown(event) {
        if (event.metaKey) return;

        if (event.key === 'Enter') return;

        document
            .querySelector(`[data-key="${event.key}" i]`)
            ?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
    }
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
    <title>Sverdle</title>
    <meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<h1>{data.league.info.name}</h1>
<p>{data.league.info.description}</p>
<span>
    {new Date(data.league.info.start_timestamp * 1000)
        .toISOString()
        .substring(0, 10)}
    -
    {new Date(data.league.info.end_timestamp * 1000)
        .toISOString()
        .substring(0, 10)}</span>
<h2>Prize Pool</h2>
<h3>$ {data.league.prize_pool.total_prize_pool.toLocaleString()}</h3>

{#each data.league.node_groups as node}
    <div>
        <div class="grid">
            {#each node.team_standings as team}
                <TeamCard {team} players={data.league.registered_players} />
            {/each}
        </div>
        {#each node.node_groups as group}
            <h3>{group.name}</h3>
            <table
                class="wikitable wikitable-bordered grouptable"
                style="width:330px;margin:0px;text-align:center">
                <tbody>
                    {#each group.team_standings as team}
                        <tr><th colspan="7"><span>Standings</span></th></tr><tr
                            ><td
                                class="bg-up"
                                style="width:28px;font-weight:bolder"></td
                            ><td
                                class="grouptableslot"
                                colspan="4"
                                style="text-align:left"
                                data-highlightingkey="1w Team"
                                ><span
                                    data-highlightingclass="1w Team"
                                    class="team-template-team-standard"
                                    ><span
                                        class="team-template-image-icon team-template-lightmode"
                                        ><img
                                            alt="1w Team"
                                            src={team.team_logo_url}
                                            decoding="async"
                                            width="100"
                                            height="50"
                                            style="vertical-align: middle" /></span>
                                    <span class="team-template-text"
                                        >{team.team_name}</span
                                    ></span>
                            </td><td
                                width="35px"
                                style="font-weight:bolder;white-space:pre"
                                >0-0-0</td
                            ><td width="35px" style="white-space:pre">0-0</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/each}
    </div>
{/each}

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1em;
    }
</style>
