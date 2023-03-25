Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/centos7"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.extra_vars = {
      python_dependencies: ["python3", "python3-pip"]
    }
  end
end