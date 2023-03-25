Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/centos7"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.extra_vars = {
      python_dependencies: ["python3", "python3-pip", "python-apt"]
    }
  end
  config.vm.define "yolo" do |app|
    app.vm.hostname = "orc-yolo.ip"
    app.vm.network :private_network, ip: "192.168.60.4"
  end
end
