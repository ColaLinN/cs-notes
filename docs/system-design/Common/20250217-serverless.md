# Cloud Native

## 从Cloud-ready, Cloud-optimised 到Cloud-native

- **Cloud-ready（云就绪）**：指应用程序已经可以在云环境中运行，但可能只是从本地迁移到云端，并没有充分利用云的优势。
  - 例如，它仍然是一个单体架构，或者只是简单地托管在云服务器上，而没有进行云原生优化。
- **Cloud-optimised（云优化）**
  - 优化现有应用 以在云环境中更高效地运行，但应用架构可能还是传统的（如单体架构）。
  - 利用云的基础设施（如托管数据库、负载均衡、自动扩展等），但没有完全采用云原生架构。
  - 可能会重构部分代码，但不会完全重新设计。
- **Cloud-native（云原生）**：指应用程序完全按照云计算的最佳实践设计和构建，通常采用容器化（如 Kubernetes）、无服务器（Serverless）、DevOps 自动化部署等方式，使其具备高可用性、可扩展性和弹性。
  - 应用从一开始就为云而设计，完全基于云的最佳实践。
  - 微服务架构，每个功能模块独立部署，并可独立扩展。
  - 容器化（Docker、Kubernetes），应用运行在可移植的容器环境中，而不是依赖传统服务器。
  - 无服务器架构（Serverless），利用 AWS Lambda、Google Cloud Functions 之类的技术，按需执行代码，无需维护服务器。
  - CI/CD（持续集成/持续部署），自动化开发、测试、部署流程，提高交付效率。

**整个过程的含义**是，该企业 **按顺序** 进行应用迁移，从最初的 **云就绪**，再到 **云优化**，最终达到了 **云原生** 的状态。这意味着他们并不是直接跳到最终形态，而是经过了一个逐步演进的过程，以确保迁移的稳定性和效率。

### **为什么 Vercel 是 Cloud-Native？**

1. **无服务器架构（Serverless）**
   - 你不需要管理服务器，Vercel 会自动运行你的代码并按需扩展。
   - 例如，API 路由可以直接运行在 Vercel 的 **Edge Functions**（边缘计算）上，无需关心后端服务器。
2. **自动化部署（CI/CD）**
   - 只需 push 代码到 GitHub/Vercel，它就会**自动构建和部署**，无需手动管理服务器或容器。
   - Vercel 甚至支持 **Preview Deployments**，每个 PR 都可以自动生成一个测试环境。
3. **全球边缘网络（Edge Computing）**
   - Vercel 使用全球 CDN（内容分发网络）自动缓存静态内容，提高访问速度。
   - **Edge Functions** 让动态请求可以在靠近用户的地方执行，提高性能。
4. **微服务架构支持**
   - Vercel 可以与**后端微服务（如 Supabase、Firebase、PlanetScale）**无缝集成，让前端和后端解耦，符合云原生理念。

## Vercel（Cloud Native）VS Cloud-Optimised

| 特性           | Vercel（Cloud-Native）      | Cloud-Optimised 例子（EC2 + Nginx） |
| -------------- | --------------------------- | ----------------------------------- |
| **服务器管理** | 无服务器，完全托管          | 需要管理 EC2 / 负载均衡             |
| **扩展方式**   | 自动扩展                    | 需要手动配置 Auto Scaling           |
| **部署方式**   | Git push 自动部署           | 需要手动 SSH 进服务器               |
| **性能优化**   | 自动 CDN 和 Edge Functions  | 需要手动配置 CDN                    |
| **架构设计**   | 面向 Serverless 和 JAMstack | 传统 Web 服务器架构                 |