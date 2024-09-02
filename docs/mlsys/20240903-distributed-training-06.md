





> If a failure occurs, `torchrun` will terminate all the processes and restart them. Each process entry point first loads and initializes the last saved snapshot, and continues training from there. So at any failure, you only lose the training progress from the last saved snapshot.
>
> In elastic training, whenever there are any membership changes (adding or removing nodes), `torchrun` will terminate and spawn processes on available devices. Having this structure ensures your training job can continue without manual intervention.
>
> from PyTorch Fault-tolerant Distributed Training with torchrun https://pytorch.org/tutorials/beginner/ddp_series_fault_tolerance.html#graceful-restarts:~:text=saved%20training%20snapshot.-,Graceful%20restarts,-For%20graceful%20restarts