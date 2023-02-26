const loadUser = (user) => {
    const URL = `https://api.github.com/users/${user}`;
    fetch(URL).then(res=>res.json()).then(data=>displayUser(data)).catch(err=>errorHandle());
}

const container = document.querySelector('.user-container');
const search = document.getElementById('search-bar');

search.addEventListener('change', (e)=>{
    e.target.value !== '' ? loadUser(e.target.value) : '';
    e.target.value = '';
})

function displayUser(data) {
    // console.log(data);
    fetch(data.followers_url).then(res=>res.json()).then(followers=>loadFollower(followers, data.id)).catch(err=>console.log(err));
    data.id? 
    container.innerHTML = `
    <div id="${data.id}" class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
                <div class="px-4 pt-4 relative">
                    <button id="dropdownButton"
                        class="absolute right-6 inline-block text-gray-500 border-2 border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 z-20"
                        type="button">
                        Followers
                    </button>
                    <!-- Dropdown menu -->
                    <div id="dropdown"
                        class="z-10 absolute right-2 top-16 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow h-72 min-h-fit overflow-y-auto w-56 dark:bg-gray-700">
                        <ul class="follower-list py-4">
                        </ul>
                    </div>
                </div>
                <div class="flex gap-4 px-5 pt-8">
                    <div class="shrink-0">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src="${data.avatar_url}" alt="Bonnie image" />
                    </div>
                    <div class="w-full">
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${data.name?data.name:'No name'}</h5>
                        <h3 onclick="window.location.href='${data.html_url}'" class="text-sm text-blue-600 mb-4 hover:text-blue-700 cursor-pointer">${data.login}</h3>
                        <h4 class="text-xs text-gray-500 dark:text-gray-400">${data.bio?data.bio:'No bio'}</h4>

                        <div
                            class="grid grid-cols-3 gap-6 my-4 px-6 py-4 rounded-md border-2 border-gray-900 bg-gray-900">
                            <div class="text-center">
                                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400">Repos</h4>
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">${data.public_repos}</h3>
                            </div>
                            <div class="text-center">
                                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400">Followers</h4>
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">${data.followers}</h3>
                            </div>
                            <div class="text-center">
                                <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400">Following</h4>
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">${data.following}</h3>
                            </div>

                        </div>

                        <div class="my-6">
                            <h4 class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2"><i
                                    class="text-gray-200 mr-2 fa-solid fa-location-dot"></i> ${data.location ? data.location:'Not Available'}</h4>
                            <h4 class="text-xs font-medium text-gray-500 dark:text-gray-400"><i
                                    class="text-gray-200 mr-1 fa-brands fa-twitter"></i> ${data.twitter_username?data.twitter_username:'Not Available'}</h4>
                        </div>

                    </div>
                </div>

            </div>
    ` : 

    container.innerHTML = `
    <div class="w-full relative p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Not Found</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Sorry, we couldn't find the user you were looking for.</p>
            </div>
    `;
}


function loadFollower(followers, id) {
    const container = document.getElementById(id);
    const follower_list = container.querySelector('.follower-list');
    const dropdown = container.querySelector('#dropdown');
    container.addEventListener('click', (e)=>{
        if (e.target.id === 'dropdownButton') dropdown.classList.toggle('hidden');
        if (e.target.id !== 'dropdown' && e.target.id !== 'dropdownButton') dropdown.classList.add('hidden');
    })

    follower_list.innerHTML = '';
    followers.forEach(follower=>{
        const li = document.createElement('li');
        li.setAttribute('onclick', `loadUser('${follower.login}')`)
        li.setAttribute('class', 'flex gap-3 items-center px-4 mb-2 cursor-pointer border-y-[1px] border-gray-600 hover:bg-gray-800');
        li.innerHTML = `
        <img class="w-12 h-12 rounded-full shadow-lg block"
                                    src="${follower.avatar_url}" alt="Bonnie image" />
                                    <h4 class="font-semibold text-gray-500 dark:text-gray-400">${follower.login}</h4>
        `;
        follower_list.appendChild(li);
    })
}


loadUser('coder-showkat');