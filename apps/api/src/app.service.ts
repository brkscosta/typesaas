import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  public getServerInfo(): { version: string; uptime: number } {
    return {
      version: this.getVersion(),
      uptime: this.getUptime(),
    }
  }

  private getVersion(): string {
    return process.env.npm_package_version ?? 'no version found'
  }

  private getUptime(): number {
    return process.uptime()
  }
}
