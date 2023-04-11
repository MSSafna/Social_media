import React from 'react'

function FollowError() {
    return (
        <div>
            <section class="bg-primary relative z-10 py-[120px] bg-indigo-500 ml-5">
                <div class="container mx-auto">
                    <div class="-mx-4 flex">
                        <div class="w-full px-4">
                            <div class="mx-auto max-w-[400px] text-center">
                                <h2
                                    class="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]"
                                >
                                    404
                                </h2>
                                <h4 class="mb-3 text-[22px] font-semibold leading-tight text-white">
                                    You are not following user
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14"
                >
                    <div
                        class="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"
                    ></div>
                    <div class="flex h-full w-1/3">
                        <div
                            class="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"
                        ></div>
                        <div
                            class="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"
                        ></div>
                    </div>
                    <div
                        class="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"
                    ></div>
                </div>
            </section>
        </div>
    )
}

export default FollowError
