
/** @satisfies {import('./$types').PageServerLoad} */
export const load = async ({ cookies }) => {
	const res = await fetch(
		'https://www.dota2.com/webapi/IDOTA2League/GetLeagueData/v001?league_id=16935&delay_seconds=0'
	);
    const resData = await res.json();

    /**
     * @type String
     */
	return {
		/**
		 * League Data from Dota2.com
		 */
		league: resData,
	};
};
