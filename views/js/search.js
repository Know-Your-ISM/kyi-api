var url = new URL(`https://kyi.herokuapp.com/api/search`);
// let url = { href: `/api/search` };
const ANDROID_API_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ3YTczMjg4NjRiNTRjMmEwZTJjNDIiLCJuYW1lIjoiQW5kcm9pZCBSb290IiwiaWF0IjoxNTkxMTkxMzQ2fQ.TsyelRUy49mBD-bFhFShoK-LJR3adlWvJA2mXgtTX4k`;

const fetchResults = async (params) => {
    var response;
    // let { name, house, branch, state, city, club } = params;
    let newURL = url.href;
    let queries = Object.keys(params);

    for (let i = 0; i < queries.length; i ++) {
        if (i !== 0) {
            newURL += `&${queries[i]}=${params[queries[i]]}`;
        } else if (i === 0) {
            newURL += `?${queries[i]}=${params[queries[i]]}`;
        }
    }

    try {
        response = await fetch(
            `${newURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${ANDROID_API_KEY}`
            }
        });

        if (response.ok) {
            var students = await response.json();
            return students;
        } else {
            return { count: 0, students: [] }
        }
    }
    catch(error) {
        console.log(error);
    }
}