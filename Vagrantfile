Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/centos7"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end