const allProjects = [

{
category: "system-administration",
title: "Installation of Windows Server 2022",
type: "Foundation Setup • Virtualization",
description: "Complete installation guide for Windows Server 2022 using GUI interface on VirtualBox.",
tags: ["Windows Server 2022","VirtualBox","GUI Installation"],
color: "blue",
image: "images/system_admin_photo/installation_of_windows_server_2022.webp",
file: "assets/system_admin/installation_of_windows_server_2022.pdf"
},

{
category: "system-administration",
title: "Initial Server Configuration Tasks",
type: "Basic Setup • Network Configuration",
description: "Essential post-installation configuration including static IP and timezone.",
tags: ["Server Configuration","Static IP","Networking"],
color: "purple",
image: "images/system_admin_photo/initial_server_configuration.webp",
file: "assets/system_admin/initial_configuration_of_windows_server_2022.pdf"
},

{
category: "system-administration",
title: "Installing Ubuntu Server",
type: "Installation • Virtualization",
description: "Installation steps and commandline verification",
tags: ["Server","Install SSH","CommandLine"],
color: "green",
image: "images/system_admin_photo/ubuntu_server_installation.png",
file: "assets/system_admin/installation_of_ubuntu_server.pdf"
},

{
    category: "python",
    title: "Number Guessing Game",
    type: "CLI Game • Game Logic",
    description: "Interactive command-line game where users guess a randomly generated number between 1-100, receiving feedback and attempt tracking.",
    tags: ["Python", "Random Module", "CLI", "Game"],
    color: "green",
    image: "images/python_photo/number_guessing_game.webp",
    file: "assets/python/number_guessing_game.txt",
    runnable: true,
    runType: "cli",
    runPage: "project_runner/project_runner_for_python.html",
    runId: "number_guessing_game",
    runScript: "../assets/run_python_project/number_guessing_game.py",
},

{ 
    category: "network-infrastructure", 
    title: "Small Office DHCP Configuration Lab", 
    type: "Router Configuration • DHCP Server", 
    description: "Configured a Cisco 2911 router as a DHCP server in a small office environment, enabling automatic IP address assignment to multiple PCs and verifying network connectivity.", 
    tags: ["DHCP", "Router Configuration", "Network Simulation", "Cisco Packet Tracer"], 
    color: "blue", 
    image: "images/network_infrastructure_photo/small_office_simulation.webp", 
    file: "assets/network_infrastructure/small_office_simulation.pdf" 
}

];